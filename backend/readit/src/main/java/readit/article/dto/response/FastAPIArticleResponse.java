package readit.article.dto.response;

import readit.article.domain.Article;
import readit.article.domain.ArticleType;
import readit.article.domain.Category;

public record FastAPIArticleResponse(
        String title,
        String content,
        String reporter,
        String link,
        String category
) {
    public static Article toEntity(FastAPIArticleResponse fastAPIArticleResponse, Category category){
        return new Article(
                null,
                category,
                ArticleType.NEWS,
                fastAPIArticleResponse.content(),
                fastAPIArticleResponse.title(),
                fastAPIArticleResponse.reporter(),
                fastAPIArticleResponse.link(),
                false,
                null,
                0
        );
    }
}
