package readit.community.domain.dto.request;

import jakarta.validation.constraints.NotNull;

public record PostChatRequest(
        Integer communityId,
        @NotNull(message = "내용은 Null 일 수 없습니다.")
        String content
) {
}
