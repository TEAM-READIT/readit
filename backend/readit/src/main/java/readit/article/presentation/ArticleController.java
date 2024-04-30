package readit.article.presentation;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import readit.article.application.ArticleService;
import readit.article.dto.GetPopularArticleResponse;
import readit.article.dto.GetArticleFromLinkResponse;


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

    @GetMapping("/link")
    public ResponseEntity<GetArticleFromLinkResponse> getArticleFromLink(@RequestParam String url){
        GetArticleFromLinkResponse articleResponse = articleService.getArticleFromLink(url);
        return ResponseEntity.ok(articleResponse);
    }
}
