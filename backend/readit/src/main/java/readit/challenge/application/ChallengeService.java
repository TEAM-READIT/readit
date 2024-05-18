package readit.challenge.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.article.domain.Article;
import readit.article.domain.repository.ArticleQueryRepository;
import readit.article.domain.repository.ArticleRepository;
import readit.challenge.domain.MemberProblem;
import readit.challenge.domain.Problem;
import readit.challenge.domain.dto.*;
import readit.challenge.domain.dto.response.*;
import readit.challenge.domain.repository.MemberProblemQueryRepository;
import readit.challenge.domain.repository.MemberProblemRepository;
import readit.challenge.domain.repository.ProblemRepository;
import readit.challenge.exception.ProblemNotFoundException;
import readit.challenge.exception.SolvedAllProblemsException;
import readit.challenge.exception.TodayChallengeFinishedException;
import readit.challenge.util.ProblemParser;
import readit.member.domain.Member;
import readit.member.domain.repository.MemberRepository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
@Transactional
@RequiredArgsConstructor
public class ChallengeService {

    private final ProblemRepository problemRepository;
    private final MemberProblemRepository memberProblemRepository;
    private final MemberProblemQueryRepository memberProblemQueryRepository;
    private final MemberRepository memberRepository;
    private final ArticleRepository articleRepository;
    private final ArticleQueryRepository articleQueryRepository;
    private final ProblemParser problemParser;

    @Transactional(readOnly = true)
    public GetChallengeRankResponse getChallengeRank(Integer memberId) {
        List<Object[]> results = memberRepository.findTop7MembersWithRank();
        AtomicReference<Integer> myRank = new AtomicReference<>(null);

        List<GetRankMember> memberList = results.stream().map(result -> {
            Integer id = (Integer) result[0];
            String name = (String) result[1];
            String profile = (String) result[2];
            Integer challengeScore = (Integer) result[3];
            Integer rank = ((Number) result[4]).intValue();

            if (id.equals(memberId)) {
                myRank.set(rank);
            }

            return GetRankMember.of(name, profile, challengeScore, rank);
        }).toList();

        return new GetChallengeRankResponse(memberList, myRank.get());
    }


    @Transactional(readOnly = true)
    public GetProblemsResponse getProblems(Integer memberId) {
        Member member = memberRepository.getById(memberId);
        List<MemberProblem> list = memberProblemRepository.findByMemberAndSolvedAt(member, LocalDate.now());
        //오늘 이미 챌린지를 참여한 경우 확인
        if (!memberProblemRepository.findByMemberAndSolvedAt(member, LocalDate.now()).isEmpty()) {
            throw new TodayChallengeFinishedException();
        }

        //내가 풀지 않은 랜덤한 비문학을 불러오기
        Article epigraphy = articleQueryRepository.findNotReadRandomEpigraphy(member).orElseThrow(SolvedAllProblemsException::new);
        String title = epigraphy.getTitle();
        String content = epigraphy.getContent();


        List<Problem> problems = problemRepository.getByArticle(epigraphy); //2개 문제 불러옴

        //파싱한 문제 2개를 List에 담음
        List<GetProblem> problemList = problems.stream()
                .map(problem -> problemParser.extract(problem.getProblemNumber(), problem))
                .toList();

        return GetProblemsResponse.of(epigraphy.getId(), title, content, problemList);
    }

    public SubmitAnswerResponse submitAnswer(Integer memberId, Integer articleId, List<GetSubmit> submitList) {
        //정답 불러와서 확인
        Member member = memberRepository.getById(memberId);
        Article article = articleRepository.getById(articleId);
        List<Problem> problems = problemRepository.findByArticle(article).orElseThrow(ProblemNotFoundException::new);
        List<GetAnswer> answerList = new ArrayList<>();

        for (int i = 0; i < problems.size(); i++) {
            int answerNumber = problems.get(i).getAnswer();
            boolean isCorrect = applyScore(submitList, answerNumber, i, member, article);
            answerList.add(GetAnswer.of(i + 1, answerNumber, isCorrect));
        }

        memberProblemRepository.findByMemberAndArticle(member, article)
                .forEach(memberProblem -> memberProblem.saveDayScore(member.getChallengeScore()));

        return SubmitAnswerResponse.from(answerList);
    }

    private boolean applyScore(List<GetSubmit> submitList, int answerNumber, int idx, Member member, Article article) {
        boolean isCorrect = false;
        int submitNumber = submitList.get(idx).optionNumber();

        if (answerNumber == submitNumber) {
            member.anwerCorrect();
            isCorrect = true;
        } else {
            member.anwerWrong();
        }

        memberProblemRepository.save(MemberProblem.builder()
                .member(member)
                .article(article)
                .solvedAt(LocalDate.now())
                .submitNumber(submitNumber)
                .isCorrect(isCorrect)
                .score(1000)
                .build()
        );

        return isCorrect;
    }

    @Transactional(readOnly = true)
    public GetChallengeStatisticsResponse getChallengeStatistics(Integer memberId) {
        List<MemberProblem> memberProblemList = memberProblemQueryRepository.findDateScore(memberId);

        List<GetScore> scoreList = memberProblemList.stream()
                .map(memberProblem -> GetScore.of(memberProblem.getSolvedAt(), memberProblem.getScore()))
                .toList();

        return GetChallengeStatisticsResponse.from(scoreList);

    }

    public GetTotalChallengeStatisticsResponse getTotalChallengeStatistics(Integer memberId) {
        boolean isSubmitToday = !memberProblemRepository.findByMember_IdAndSolvedAt(memberId, LocalDate.now()).isEmpty();
        List<GetTotalScore> totalList = memberProblemQueryRepository.findTotalDateScore();

        return GetTotalChallengeStatisticsResponse.of(totalList, isSubmitToday);
    }
}
