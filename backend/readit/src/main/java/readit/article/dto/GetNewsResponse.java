package readit.article.dto;

import readit.article.domain.Article;

public record GetNewsResponse(
        Integer id,
        String title,
        String content,
        String type,
        String categoryName,
        Integer hit,
        String reporter
) {
    public static GetNewsResponse from(Article article){
        return new GetNewsResponse(
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
