package readit.article.dto.response;

import readit.viewer.domain.entity.MemberArticle;

import java.util.List;

import static java.util.stream.Collectors.toList;

public record GetStatsResponse(
        List<GetScoreResponse> scoreList
) {
    public static GetStatsResponse from(List<MemberArticle> memberArticles){
        List<GetScoreResponse> scoreResponses = memberArticles.stream()
                .map(GetScoreResponse::from).collect(toList());
        return new GetStatsResponse(scoreResponses);
    }
}
