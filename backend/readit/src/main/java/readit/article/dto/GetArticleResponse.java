package readit.article.dto;

import readit.article.domain.Article;
import readit.article.domain.ArticleType;

public record GetArticleResponse(
        Integer id,
        String title,
        String content,
        String type,
        String categoryName,
        Integer hit,
        String reporter
) {
    public static GetArticleResponse from(Article article){
        return new GetArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                article.getType().toString(),
                article.getCategory().getName(),
                article.getHit(),
                article.getReporter()
        );
    }
}
