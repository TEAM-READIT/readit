package readit.viewer.domain.dto.gpt;

import java.util.List;

public record GPTPrompt(
        String model,
        List<GPTMessage> messages,
        Integer max_tokens,
        float temperature
) {
    public static GPTPrompt of(String model, List<GPTMessage> messages, PromptType type) {
        if (type.equals(PromptType.WORDS)) {
            return new GPTPrompt(model, messages, 2000, 0.5F);
        } else {
            return new GPTPrompt(model, messages, 500, 0.7F);
        }
    }

}
