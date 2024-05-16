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
import readit.common.asepect.exectime.ExecutionTime;
import readit.community.application.CommunityService;
import readit.community.domain.dto.request.GetCreateCommunityRequest;
import readit.community.domain.dto.request.PostChatRequest;
import readit.community.domain.dto.response.GetCommunityDetailResponse;
import readit.community.domain.dto.response.GetCommunityListResponse;
import readit.community.domain.dto.response.GetHotCommunityResponse;
import readit.community.domain.dto.response.GetMyCommunityResponse;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {

    private final CommunityService communityService;

    @ExecutionTime
    @GetMapping("/list")
    @Operation(summary = "커뮤니티 모집글 조회", description = "커뮤니티 리스트 조회 기능입니다.")
    public ResponseEntity<GetCommunityListResponse> getCommunityList(@RequestParam(required = false) String category,
                                                                     @RequestParam(required = false) String title,
                                                                     @RequestParam(required = false) String content,
                                                                     @RequestParam(required = false) String writerName,
                                                                     @RequestParam(required = false) Integer maxParticipants,
                                                                     @RequestParam(defaultValue = "0") Integer cursor,
                                                                     @RequestParam(defaultValue = "false") Boolean hit,
                                                                     @RequestParam(defaultValue = "12")  Integer limit) {

        GetCommunityListResponse response = communityService.getCommunityList(
                category, title, content, writerName, maxParticipants, cursor, hit, limit);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{communityId}")
    @Operation(summary = "커뮤니티 상세 조회", description = "커뮤니티 상세 조회 기능입니다.")
    public ResponseEntity<GetCommunityDetailResponse> getCommunityDetails(@PathVariable Integer communityId,
                                                                          @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
        GetCommunityDetailResponse response = communityService.getCommunityDetail(communityId, memberId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{communityId}")
    @Operation(summary = "커뮤니티 참여", description = "커뮤니티 참여 기능입니다.")
    public ResponseEntity<Void> joinCommunity(@PathVariable Integer communityId,
                                              @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
        communityService.joinCommunity(communityId, memberId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{communityId}")
    @Operation(summary = "커뮤니티 탈퇴", description = "커뮤니티 탈퇴 기능입니다.")
    public ResponseEntity<Void> leaveCommunity(@PathVariable Integer communityId,
                                               @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
        communityService.leaveCommunity(communityId, memberId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/create")
    @Operation(summary = "커뮤니티 생성", description = "커뮤니티 생성 기능입니다.")
    public ResponseEntity<Void> createCommunity(@Valid @RequestBody GetCreateCommunityRequest request,
                                                @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
        communityService.createCommunity(request, memberId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/chat")
    @Operation(summary = "커뮤니티 채팅", description = "커뮤니티 채팅 전송 기능입니다.")
    public ResponseEntity<Void> sendChat(@Valid @RequestBody PostChatRequest request,
                                         @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
        communityService.sendChat(request, memberId);
        return ResponseEntity.ok().build();
    }

    @ExecutionTime
    @GetMapping("/hot")
    @Operation(summary = "커뮤니티 인기글 8개 조회", description = "커뮤니티 인기글 조회 기능입니다.")
    public ResponseEntity<GetHotCommunityResponse> getHotCommunityList() {
        GetHotCommunityResponse response = communityService.getHotCommunityList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/myCommunity")
    @Operation(summary = "내 커뮤니티 조회", description = "내 커뮤니티 조회 기능입니다.")
    public ResponseEntity<GetMyCommunityResponse> getMyCommunityList(@Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
        GetMyCommunityResponse response = communityService.getMyCommunityList(memberId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/hits/{communityId}")
    @Operation(summary = "커뮤니티 글 방문", description = "커뮤니티 글 방문 기능입니다.")
    public ResponseEntity<Void> increaseHits(@PathVariable Integer communityId) {
        communityService.increaseHits(communityId);
        return ResponseEntity.ok().build();
    }

}
