package readit.challenge.domain.dto.response;

import readit.challenge.domain.dto.GetRankMember;

import java.util.List;

public record GetChallengeRankResponse(
        List<GetRankMember> memberList,
        Integer myRank

) {
}
