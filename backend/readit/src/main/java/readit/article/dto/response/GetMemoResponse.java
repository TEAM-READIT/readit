package readit.article.dto.response;

import readit.viewer.domain.entity.Memo;

public record GetMemoResponse(
        Integer id,
        String content
) {
    public static GetMemoResponse from(Memo memo){
        return new GetMemoResponse(
                memo.getId(),
                memo.getContent()
        );
    }
}
