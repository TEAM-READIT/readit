package readit.community.domain.dto.request;

import jakarta.validation.constraints.NotNull;

public record PostChatRequest(
        Integer communityId,
        @NotNull String content
) {
}
