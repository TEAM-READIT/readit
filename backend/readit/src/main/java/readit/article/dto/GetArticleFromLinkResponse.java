package readit.article.dto;

import readit.article.domain.ArticleType;

public record GetArticleFromLinkResponse(
        String title,
        String content,
        String type,
        String categoryName,
        Integer hit,
        String reporter
) {
    public static GetArticleFromLinkResponse from(FastAPIArticleResponse fastAPIArticleResponse){
        return new GetArticleFromLinkResponse(
                fastAPIArticleResponse.title(),
                fastAPIArticleResponse.content(),
                ArticleType.NEWS.toString(),
                fastAPIArticleResponse.category(),
                0,
                fastAPIArticleResponse.reporter()
        );
    }
}
