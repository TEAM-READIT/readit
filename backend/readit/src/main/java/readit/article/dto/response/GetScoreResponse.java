package readit.article.dto.response;

import readit.viewer.domain.entity.MemberArticle;

public record GetScoreResponse(
    String type,
    Integer score
) {
    public static GetScoreResponse from(MemberArticle memberArticle){
        return new GetScoreResponse(
                memberArticle.getArticle().getType().toString(),
                memberArticle.getScore()
        );
    }
}
