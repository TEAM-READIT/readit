package readit.viewer.presentation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import readit.viewer.application.DictionarySearchService;
import readit.viewer.application.ViewerService;
import readit.viewer.domain.dto.Word;
import readit.viewer.domain.dto.response.WordListResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/viewer")
public class ViewerController {

    private final ViewerService viewerService;
    private final DictionarySearchService dictionarySearchService;

    @GetMapping("/{articleId}")
    public ResponseEntity<WordListResponse> getArticleViewer(@PathVariable Integer articleId) {
        return ResponseEntity.ok(viewerService.loadArticle(articleId));
    }

    @GetMapping("/word/{word}")
    public ResponseEntity<Word> searchMeaning(@PathVariable String word) {
        return ResponseEntity.ok(dictionarySearchService.search(word));
    }

}
