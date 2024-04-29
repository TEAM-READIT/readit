package readit.article.dto;

import readit.article.domain.Article;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

public record GetPopularArticleResponse (
    List<GetArticleResponse> articleList,
    List<GetEpigraphyResponse> epigraphyList,
    List<GetNewsResponse> newsList
){
    public static GetPopularArticleResponse from(List<Article> articles, List<Article> news, List<Article> epigraphies){

        List<GetArticleResponse> articleResponses = articles.stream()
                .map(GetArticleResponse::from).collect(toList());
        List<GetEpigraphyResponse> newsResponses = news.stream()
                .map(GetEpigraphyResponse::from).collect(toList());
        List<GetNewsResponse> epigraphyResponses = epigraphies.stream()
                .map(GetNewsResponse::from).collect(toList());

        return new GetPopularArticleResponse(articleResponses,newsResponses, epigraphyResponses);
    }
}
