package readit.viewer.domain.dto;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GPTRequestDto {
    private String model;
    private List<GPTMessage> messages;
    private Integer max_tokens;
    private float temperature;

    @Builder
    GPTRequestDto(String model, List<GPTMessage> messages, Integer max_tokens, float temperature) {
        this.model = model;
        this.messages = messages;
        this.max_tokens = max_tokens;
        this.temperature = temperature;
    }

}
