package readit.challenge.domain.dto;

public record GetOption(
        Integer optionNumber,
        String option
) {
    public static GetOption of(Integer optionNumber, String option) {
        return new GetOption(optionNumber,option);
    }
}
