package readit.challenge.domain.dto.request;

import readit.challenge.domain.dto.GetAnswer;
import readit.challenge.domain.dto.GetSubmit;

import java.util.List;

public record SubmitAnswerRequest(
        Integer articleId,
        List<GetSubmit> submitList

) {
}




