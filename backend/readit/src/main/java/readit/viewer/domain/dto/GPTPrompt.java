package readit.viewer.domain.dto;

import java.util.List;

public record GPTPrompt(
        String model,
        List<GPTMessage> messages,
        Integer max_tokens,
        float temperature
) {
    public static GPTPrompt of(String model, List<GPTMessage> messages, Integer max_tokens, float temperature) {
        return new GPTPrompt(model, messages, max_tokens, temperature);
    }
}
