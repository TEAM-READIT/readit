package readit.article.dto.response;

import readit.article.domain.Article;
import readit.article.util.ArticleJsonUtil;
import readit.viewer.domain.dto.Word;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public record GetArticleResponse(
        Integer id,
        String title,
        String content,
        String type,
        String categoryName,
        Integer hit,
        String reporter,
        List<GetWordResponse> words
) {
    public static GetArticleResponse from(Article article) {
        List<GetWordResponse> words =  Optional.ofNullable(article.getWords())
                .map(ArticleJsonUtil::toJson)
                .map(ArticleJsonUtil::toList)
                .orElse(new ArrayList<>());

        return new GetArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                article.getType().toString(),
                article.getCategory().getName(),
                article.getHit(),
                article.getReporter(),
                words
        );
    }
}
