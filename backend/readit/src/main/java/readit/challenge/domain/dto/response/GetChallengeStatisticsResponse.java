package readit.challenge.domain.dto.response;

import readit.challenge.domain.dto.GetScore;

import java.util.Date;
import java.util.List;

public record GetChallengeStatisticsResponse(
        List<GetScore> scoreList
) {
    public static GetChallengeStatisticsResponse from(List<GetScore> scoreList) {
        return new GetChallengeStatisticsResponse(scoreList);
    }
}
