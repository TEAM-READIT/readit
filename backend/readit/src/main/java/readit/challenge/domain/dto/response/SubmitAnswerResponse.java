package readit.challenge.domain.dto.response;

import readit.challenge.domain.dto.GetAnswer;

import java.util.List;

public record SubmitAnswerResponse(
        List<GetAnswer> answerList
) {
    public static SubmitAnswerResponse from(List<GetAnswer> answerList) {
        return new SubmitAnswerResponse(answerList);
    }
}