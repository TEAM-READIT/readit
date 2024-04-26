package readit.article.presentation;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import readit.article.application.ArticleService;
import readit.article.dto.GetPopularArticleResponse;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/article")
public class ArticleController {

    private ArticleService articleService;

    @GetMapping("/hot")
    public ResponseEntity<GetPopularArticleResponse> getPopularArticle(){
        GetPopularArticleResponse popularArticleResponses = articleService.getPopularArticles();
        return ResponseEntity.ok(popularArticleResponses);
    }

}
