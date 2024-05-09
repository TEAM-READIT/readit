package readit.challenge.domain.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record GetSubmit(
        Integer problemNumber,

        @NotNull(message = "답을 입력하지 않았습니다.")
        @Min(value = 1, message = "보기 번호는 1이상 5이하입니다.")
        @Max(value = 5, message = "보기 번호는 1이상 5이하입니다.")
        Integer optionNumber
) {
}