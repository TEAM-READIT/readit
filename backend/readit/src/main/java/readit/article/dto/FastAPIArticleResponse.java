package readit.article.dto;

import readit.article.domain.Article;
import readit.article.domain.ArticleType;
import readit.article.domain.Category;

public record FastAPIArticleResponse(
        String title,
        String content,
        String category,
        String sourceUrl,
        String reporter

) {
    public static Article toEntity(FastAPIArticleResponse fastAPIArticleResponse, Category category){
        return Article
                .builder()
                .category(category)
                .type(ArticleType.NEWS)
                .content(fastAPIArticleResponse.content())
                .title(fastAPIArticleResponse.title())
                .reporter(fastAPIArticleResponse.reporter())
                .sourceUrl(fastAPIArticleResponse.sourceUrl())
                .hasWord(false)
                .hit(0)
                .build();
    }
}
