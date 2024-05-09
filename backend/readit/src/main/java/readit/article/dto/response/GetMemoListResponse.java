package readit.article.dto.response;

import readit.viewer.domain.entity.Memo;

import java.util.List;

import static java.util.stream.Collectors.toList;

public record GetMemoListResponse(
        List<GetMemoResponse> memoList
) {
    public static GetMemoListResponse from(List<Memo> memos){
        List<GetMemoResponse> memoResponses = memos.stream()
                .map(GetMemoResponse::from)
                .toList();
        return new GetMemoListResponse(memoResponses);
    }
}
