package readit.article.dto.response;

import readit.article.domain.Article;
import readit.article.dto.Page;

import java.util.List;

import static java.util.stream.Collectors.toList;

public record GetArticleSearchResponse(
        List<GetArticleResponse> articleList,
        Boolean hasNext
){
    public static GetArticleSearchResponse from(Page<Article> articles){
        List<GetArticleResponse> articleResponses = articles.stream()
                .map(GetArticleResponse::from)
                .collect(toList());
        return new GetArticleSearchResponse(articleResponses,articles.hasNext);
    }
}
