package readit.viewer.domain.dto;

public record GPTMessage (
        String role,
        String content
) {
    public static GPTMessage of(String role, String content) {
        return new GPTMessage(role, content);
    }
}
