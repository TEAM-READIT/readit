package readit.challenge.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.article.domain.Article;
import readit.article.domain.repository.ArticleRepository;
import readit.challenge.domain.MemberProblem;
import readit.challenge.domain.Problem;
import readit.challenge.domain.dto.GetAnswer;
import readit.challenge.domain.dto.GetProblem;
import readit.challenge.domain.dto.GetRankMember;
import readit.challenge.domain.dto.GetSubmit;
import readit.challenge.domain.dto.response.GetChallengeRankResponse;
import readit.challenge.domain.dto.response.GetProblemsResponse;
import readit.challenge.domain.dto.response.SubmitAnswerResponse;
import readit.challenge.domain.repository.MemberProblemRepository;
import readit.challenge.domain.repository.ProblemRepository;
import readit.challenge.exception.ProblemNotFoundException;
import readit.challenge.exception.SolvedAllProblemsException;
import readit.challenge.util.ProblemParser;
import readit.member.domain.Member;
import readit.member.domain.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChallengeService {

    private final ProblemRepository problemRepository;
    private final MemberProblemRepository memberProblemRepository;
    private final MemberRepository memberRepository;
    private final ArticleRepository articleRepository;
    private final ProblemParser problemParser;

    @Transactional(readOnly = true)
    public GetChallengeRankResponse getChallengeRank(Integer memberId) {

        List<GetRankMember> memberList = memberRepository.findTop7ByOrderByChallengeScoreDesc().stream()
                .map(member -> GetRankMember.of(member.getName(), member.getProfile()))
                .toList();

        int myScore = memberRepository.getById(memberId).getChallengeScore();
        int myRank = memberRepository.countPlayersWithHigherScore(myScore).orElseThrow() + 1;

        return new GetChallengeRankResponse(memberList, myRank);

    }

    @Transactional(readOnly = true)
    public GetProblemsResponse getProblems(Integer memberId) {

        //내가 풀지 않은 랜덤한 글을 불러오기
        Integer articleId = articleRepository.findNotReadRandomArticle(memberId).orElseThrow(SolvedAllProblemsException::new);
        Article article = articleRepository.getById(articleId);
        String title = article.getTitle();
        String content = article.getContent();


        List<Problem> problems = problemRepository.getByArticle(articleRepository.getById(articleId)); //2개 문제 불러옴

        //파싱한 문제 2개를 List에 담음
        List<GetProblem> problemList = problems.stream()
                .map(problem -> problemParser.extract(problem.getProblemNumber(), problem))
                .toList();

        return GetProblemsResponse.of(articleId, title, content, problemList);
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
                .solvedAt(LocalDateTime.now())
                .submitNumber(submitNumber)
                .isCorrect(isCorrect)
                .build()
        );

        return isCorrect;
    }

}
