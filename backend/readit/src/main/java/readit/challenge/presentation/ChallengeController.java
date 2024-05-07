package readit.challenge.presentation;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import readit.auth.dto.AuthCredentials;
import readit.auth.presentation.Auth;
import readit.challenge.application.ChallengeService;
import readit.challenge.domain.dto.response.GetChallengeRankResponse;

@RestController
@AllArgsConstructor
@RequestMapping("/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;

    @GetMapping("/rank")
    public ResponseEntity<GetChallengeRankResponse> getChallengeRank(@Parameter(hidden = true) @Auth AuthCredentials authCredentials){
        GetChallengeRankResponse getChallengeRankResponse = challengeService.getChallengeRank(authCredentials.id());
        return ResponseEntity.ok(getChallengeRankResponse);
    }

    @GetMapping
    public ResponseEntity<GetProblemsResponse> getProblems(@Parameter(hidden = true) @Auth AuthCredentials authCredentials){
        challengeService.getProblems();
        return ResponseEntity.ok(getChallengeRankResponse);
    }

}
