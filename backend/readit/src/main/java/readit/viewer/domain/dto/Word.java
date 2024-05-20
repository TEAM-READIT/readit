package readit.viewer.domain.dto;


public record Word(
        String word,
        String definition
) {
    public static Word of(String word, String definition) {
        return new Word(word, definition);
    }
}
