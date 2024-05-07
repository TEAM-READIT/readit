package readit.article.dto.response;

import readit.viewer.domain.entity.MemberArticle;

public record GetSearchResponse(
        Integer id,
        String title,
        String content,
        String type,
        String categoryName,
        String reporter,
        Integer hit
) {
    public static GetSearchResponse from(MemberArticle memberArticle){
            return new GetSearchResponse(
                    memberArticle.getId(),
                    memberArticle.getArticle().getTitle(),
                    memberArticle.getContent(),
                    memberArticle.getArticle().getType().name(),
                    memberArticle.getArticle().getCategory().getName(),
                    memberArticle.getArticle().getReporter(),
                    memberArticle.getArticle().getHit()
            );
    }
}
