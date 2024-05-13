package readit.challenge.util;

import org.springframework.stereotype.Component;
import readit.challenge.domain.Problem;
import readit.challenge.domain.dto.GetOption;
import readit.challenge.domain.dto.GetProblem;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProblemParser {

    public GetProblem extract(Integer problemNumber, Problem problem) {

        String notParsedProblem = problem.getProblem(); //파싱 전 문자열

        return GetProblem.of(problemNumber, extractProblem(notParsedProblem), extractOption(notParsedProblem));
    }

    public String extractProblem(String notParsedProblem) {
        int endIndex = notParsedProblem.indexOf("①");

        return notParsedProblem.substring(3, endIndex - 2);
    }

    public List<GetOption> extractOption(String notParsedProblem) {
        List<GetOption> optionList = new ArrayList<>();
        int startIndex = notParsedProblem.indexOf("①");
        int endIndex = notParsedProblem.indexOf("②");
        optionList.add(GetOption.of(1, notParsedProblem.substring(startIndex, endIndex - 1)));

        startIndex = endIndex;
        endIndex = notParsedProblem.indexOf("③");
        optionList.add(GetOption.of(2, notParsedProblem.substring(startIndex, endIndex - 1)));

        startIndex = endIndex;
        endIndex = notParsedProblem.indexOf("④");
        optionList.add(GetOption.of(3, notParsedProblem.substring(startIndex, endIndex - 1)));

        startIndex = endIndex;
        endIndex = notParsedProblem.indexOf("⑤");
        optionList.add(GetOption.of(4, notParsedProblem.substring(startIndex, endIndex - 1)));

        startIndex = endIndex;
        optionList.add(GetOption.of(5, notParsedProblem.substring(startIndex, notParsedProblem.length())));

        return optionList;
    }
}
