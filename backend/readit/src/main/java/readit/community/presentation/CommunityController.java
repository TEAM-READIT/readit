package readit.community.presentation;

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


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("/{communityId}")
    public ResponseEntity<GetCommunityDetailResponse> getCommunityDetails(@PathVariable Integer communityId,
                                                                          @Auth AuthCredentials authCredentials) {
        // todo: add auth
        Integer memberId = authCredentials.id();
        memberId = 1;
        GetCommunityDetailResponse response = communityService.getCommunityDetail(communityId, memberId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{communityId}")
    public ResponseEntity<Void> joinCommunity(@PathVariable Integer communityId,
                                              @Auth AuthCredentials authCredentials) {
        // todo: add auth
        Integer memberId = authCredentials.id();
        memberId = 1;
        communityService.joinCommunity(communityId, memberId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{communityId}")
    public ResponseEntity<Void> leaveCommunity(@PathVariable Integer communityId,
                                               @Auth AuthCredentials authCredentials) {
        // todo: add auth
        Integer memberId = authCredentials.id();
        memberId = 1;
        communityService.leaveCommunity(communityId, memberId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createCommunity(@Valid @RequestBody GetCreateCommunityRequest request,
                                                @Auth AuthCredentials authCredentials) {
        // todo: add auth
        Integer memberId = authCredentials.id();
        memberId = 1;
        communityService.createCommunity(request, memberId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/chat")
    public ResponseEntity<Void> sendChat(@Valid @RequestBody PostChatRequest request,
                                         @Auth AuthCredentials authCredentials) {
        // todo: add auth
        Integer memberId = authCredentials.id();
        memberId = 1;
        communityService.sendChat(request, memberId);
        return ResponseEntity.ok().build();
    }
}
