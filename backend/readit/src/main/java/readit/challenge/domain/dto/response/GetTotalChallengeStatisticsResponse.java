package readit.challenge.domain.dto.response;

import readit.challenge.domain.dto.GetProblem;
import readit.challenge.domain.dto.GetTotalScore;

import java.util.List;

public record GetTotalChallengeStatisticsResponse(
        List<GetTotalScore> totalScoreList,
        boolean isSubmitToday
) {
    public static GetTotalChallengeStatisticsResponse of(List<GetTotalScore> totalScoreList, boolean isSubmitToday) {
        return new GetTotalChallengeStatisticsResponse(totalScoreList, isSubmitToday);
    }
}
