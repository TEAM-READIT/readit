package readit.challenge.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.challenge.domain.dto.GetRankMember;
import readit.challenge.domain.dto.response.GetChallengeRankResponse;
import readit.challenge.domain.repository.MemberQuestionRepository;
import readit.challenge.domain.repository.ProblemRepository;
import readit.member.domain.Member;
import readit.member.domain.repository.MemberRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChallengeService {

    private final ProblemRepository problemRepository;
    private final MemberQuestionRepository memberQuestionRepository;
    private final MemberRepository memberRepository;

    public GetChallengeRankResponse getChallengeRank(Integer memberId) {

        List<GetRankMember> memberList = memberRepository.findTop7ByOrderByChallengeScoreDesc().stream()
                .map(member -> GetRankMember.of(member.getName(), member.getProfile()))
                .toList();

        int myScore = memberRepository.getById(memberId).getChallengeScore();
        int myRank = memberRepository.countPlayersWithHigherScore(myScore).orElseThrow() + 1;

        return new GetChallengeRankResponse(memberList, myRank);

    }

}
