package readit.article.dto.response;

import readit.article.domain.Article;

public record GetEpigraphyResponse(
        Integer id,
        String title,
        String content,
        String type,
        String categoryName,
        Integer hit
) {
    public static GetEpigraphyResponse from(Article article){
        return new GetEpigraphyResponse(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                article.getType().toString(),
                article.getCategory().getName(),
                article.getHit()
        );
    }
}
