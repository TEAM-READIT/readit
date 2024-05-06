package readit.community.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import readit.auth.dto.AuthCredentials;
import readit.auth.presentation.Auth;
import readit.community.application.CommunityService;
import readit.community.domain.dto.request.GetCreateCommunityRequest;
import readit.community.domain.dto.request.PostChatRequest;
import readit.community.domain.dto.response.GetCommunityDetailResponse;
import readit.community.domain.dto.response.GetHotCommunityResponse;
import readit.community.domain.dto.response.GetMyCommunityResponse;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("/{communityId}")
    @Operation(summary = "글 조회", description = "글 조회 기능입니다.")
    public ResponseEntity<GetCommunityDetailResponse> getCommunityDetails(@PathVariable Integer communityId,
                                                                          @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
        GetCommunityDetailResponse response = communityService.getCommunityDetail(communityId, memberId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{communityId}")
    public ResponseEntity<Void> joinCommunity(@PathVariable Integer communityId,
                                              @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
        communityService.joinCommunity(communityId, memberId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{communityId}")
    public ResponseEntity<Void> leaveCommunity(@PathVariable Integer communityId,
                                               @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
        communityService.leaveCommunity(communityId, memberId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createCommunity(@Valid @RequestBody GetCreateCommunityRequest request,
                                                @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
        communityService.createCommunity(request, memberId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/chat")
    public ResponseEntity<Void> sendChat(@Valid @RequestBody PostChatRequest request,
                                         @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
        communityService.sendChat(request, memberId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/hot")
    public ResponseEntity<GetHotCommunityResponse> getHotCommunityList() {
        GetHotCommunityResponse response = communityService.getHotCommunityList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/myCommunity")
    public ResponseEntity<GetMyCommunityResponse> getMyCommunityList(@Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
        GetMyCommunityResponse response = communityService.getMyCommunityList(memberId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/hits/{communityId}")
    public ResponseEntity<Void> increaseHits(@PathVariable Integer communityId) {
        communityService.increaseHits(communityId);
        return ResponseEntity.ok().build();
    }
}
