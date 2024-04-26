package readit.viewer.domain.dto;

import java.util.List;

public record GPTRequestDto (
        String model,
        List<GPTMessage> messages,
        Integer max_tokens,
        float temperature
) {
    public static GPTRequestDto of(String model, List<GPTMessage> messages, Integer max_tokens, float temperature) {
        return new GPTRequestDto(model, messages, max_tokens, temperature);
    }
}
