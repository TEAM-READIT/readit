package readit.article.dto.response;

import readit.viewer.domain.entity.Memo;

import java.util.List;

import static java.util.stream.Collectors.toList;

public record GetSearchListResponse(
        List<GetSearchResponse> searchList
){
    public static GetSearchListResponse from(List<?> articles, List<Memo> memos){
        List<GetSearchResponse> articleResponses = articles.stream()
                .map(article -> GetSearchResponse.from(article, memos))
                .collect(toList());
        return new GetSearchListResponse(articleResponses);
    }
}
