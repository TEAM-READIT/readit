package readit.community.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import readit.auth.dto.AuthCredentials;
import readit.auth.presentation.Auth;
import readit.community.application.CommunityService;
import readit.community.domain.dto.GetCreateCommunityRequest;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {

    private final CommunityService communityService;

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
}
