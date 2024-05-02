package readit.community.presentation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import readit.community.application.CommunityService;
import readit.community.domain.dto.GetCreateCommunityRequest;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("/create")
    public ResponseEntity<Void> createCommunity(GetCreateCommunityRequest request) {
        // todo: add auth
        return ResponseEntity.ok().build();
    }
}
