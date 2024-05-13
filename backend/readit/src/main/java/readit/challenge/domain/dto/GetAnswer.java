package readit.challenge.domain.dto;

public record GetAnswer(
        Integer problemNumber,
        Integer answerNumber,
        Boolean isCorrect
) {
    public static GetAnswer of(Integer problemNumber, Integer answerNumber,Boolean isCorrect) {
        return new GetAnswer(problemNumber,answerNumber, isCorrect);
    }
}