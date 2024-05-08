package readit.challenge.presentation;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import readit.auth.dto.AuthCredentials;
import readit.auth.presentation.Auth;
import readit.challenge.application.ChallengeService;
import readit.challenge.domain.dto.request.SubmitAnswerRequest;
import readit.challenge.domain.dto.response.GetChallengeRankResponse;
import readit.challenge.domain.dto.response.GetProblemsResponse;
import readit.challenge.domain.dto.response.SubmitAnswerResponse;

@RestController
@AllArgsConstructor
@RequestMapping("/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;

    @GetMapping("/rank")
    public ResponseEntity<GetChallengeRankResponse> getChallengeRank(@Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        GetChallengeRankResponse getChallengeRankResponse = challengeService.getChallengeRank(authCredentials.id());
        return ResponseEntity.ok(getChallengeRankResponse);
    }

    @GetMapping
    public ResponseEntity<GetProblemsResponse> getProblems(@Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        GetProblemsResponse getProblemsResponse = challengeService.getProblems(authCredentials.id());
        return ResponseEntity.ok(getProblemsResponse);
    }


    @PostMapping
    public ResponseEntity<SubmitAnswerResponse> submitAnswer(
            @Parameter(hidden = true) @Auth AuthCredentials authCredentials,
            @RequestBody SubmitAnswerRequest submitAnswerRequest) {
        SubmitAnswerResponse submitAnswerResponse = challengeService.submitAnswer(authCredentials.id(), submitAnswerRequest.articleId(), submitAnswerRequest.submitList());
        return ResponseEntity.ok(submitAnswerResponse);
    }
}
