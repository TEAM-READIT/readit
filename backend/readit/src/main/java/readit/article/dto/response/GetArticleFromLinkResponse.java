package readit.article.dto.response;

import readit.article.domain.ArticleType;

public record GetArticleFromLinkResponse(
        Integer id,
        String title,
        String content,
        String type,
        String categoryName,
        Integer hit,
        String reporter
) {
    public static GetArticleFromLinkResponse from(FastAPIArticleResponse fastAPIArticleResponse,Integer id){
        return new GetArticleFromLinkResponse(
                id,
                fastAPIArticleResponse.title(),
                fastAPIArticleResponse.content(),
                ArticleType.NEWS.toString(),
                fastAPIArticleResponse.category(),
                0,
                fastAPIArticleResponse.reporter()
        );
    }
}
