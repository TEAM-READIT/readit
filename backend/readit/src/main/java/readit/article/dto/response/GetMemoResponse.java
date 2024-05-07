package readit.article.dto.response;

import readit.viewer.domain.entity.Memo;

public record GetMemoResponse(
        Integer id,
        Integer startIndex,
        Integer endIndex,
        String color,
        String content
) {
    public static GetMemoResponse from(Memo memo){
        return new GetMemoResponse(
                memo.getId(),
                memo.getStartIndex(),
                memo.getEndIndex(),
                memo.getColor(),
                memo.getContent()
        );
    }
}
