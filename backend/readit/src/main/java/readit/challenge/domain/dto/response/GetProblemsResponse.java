package readit.challenge.domain.dto.response;

import readit.challenge.domain.dto.GetProblem;

import java.util.List;

public record GetProblemsResponse(
        Integer articleId,
        String content,
        List<GetProblem> problemList

) {
    public static GetProblemsResponse of(Integer articleId, String content, List<GetProblem> problemList) {
        return new GetProblemsResponse(articleId, content, problemList);
    }

}

