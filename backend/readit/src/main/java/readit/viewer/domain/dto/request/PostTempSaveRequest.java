package readit.viewer.domain.dto.request;

import jakarta.validation.constraints.NotNull;

public record PostTempSaveRequest(
        @NotNull(message = "요약은 500자 이하로 가능합니다.")
        String summary,
        String content
) {
}
