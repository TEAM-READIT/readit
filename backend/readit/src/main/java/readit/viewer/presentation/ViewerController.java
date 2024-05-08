package readit.viewer.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import readit.auth.dto.AuthCredentials;
import readit.auth.presentation.Auth;
import readit.viewer.application.ViewerService;
import readit.viewer.domain.dto.Word;
import readit.viewer.domain.dto.request.PostTempSaveRequest;
import readit.viewer.domain.dto.response.GetWordListResponse;
import readit.viewer.domain.dto.response.SubmissionResponse;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/viewer")
public class ViewerController {

    private final ViewerService viewerService;

    @GetMapping("/{articleId}")
    @Operation(summary = "뷰어 조회 (어려운 단어 리스트 추출)", description = "뷰어 조회 기능입니다.")
    public ResponseEntity<GetWordListResponse> getArticleViewer(@PathVariable Integer articleId,
                                                                @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        return ResponseEntity.ok(viewerService.loadArticleWithWords(articleId));
    }

    @GetMapping("/word/{word}")
    @Operation(summary = "사전 검색", description = "사전 검색 기능입니다.")
    public ResponseEntity<Word> searchMeaning(@PathVariable String word,
                                              @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        return ResponseEntity.ok(viewerService.dictionarySearch(word));
    }

    @PostMapping("/temp/{articleId}")
    @Operation(summary = "뷰어 임시 저장", description = "뷰어 임시 저장 기능입니다.")
    public ResponseEntity<Void> saveTemp(@PathVariable Integer articleId,
                                         @RequestBody PostTempSaveRequest request,
                                         @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
//        memberId = 3;
        viewerService.saveTemp(articleId, memberId, request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/submission/{articleId}")
    @Operation(summary = "뷰어 최종 제출", description = "뷰어 최종 제출 기능입니다.")
    public ResponseEntity<SubmissionResponse> submitSummary(@PathVariable Integer articleId,
                                                            @RequestBody PostTempSaveRequest request,
                                                            @Parameter(hidden = true) @Auth AuthCredentials authCredentials) {
        Integer memberId = authCredentials.id();
//        memberId = 3;
        viewerService.saveTemp(articleId, memberId, request);
        return ResponseEntity.ok(viewerService.submitSummary(articleId, memberId, request.summary()));
    }
}
