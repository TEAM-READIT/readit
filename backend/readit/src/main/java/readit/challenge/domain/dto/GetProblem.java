package readit.challenge.domain.dto;

import java.util.List;

public record GetProblem(
        Integer problemNumber,
        String problem,
        List<GetOption> optionList
) {
    public static GetProblem of(Integer problemNumber, String problem, List<GetOption> optionList) {
        return new GetProblem(problemNumber, problem, optionList);
    }
}