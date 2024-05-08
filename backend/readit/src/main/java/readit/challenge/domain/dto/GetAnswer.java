package readit.challenge.domain.dto;

public record GetAnswer(
        Integer problemNumber,
        Integer answerNumber
) {
    public static GetAnswer of(Integer problemNumber, Integer answerNumber) {
        return new GetAnswer(problemNumber,answerNumber);
    }
}