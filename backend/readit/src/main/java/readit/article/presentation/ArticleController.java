package readit.article.presentation;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import readit.article.application.ArticleService;
import readit.article.dto.response.GetMemberArticleListResponse;
import readit.article.dto.response.GetPopularArticleResponse;
import readit.article.dto.response.GetArticleFromLinkResponse;
import readit.article.dto.response.GetStatsResponse;
import readit.article.dto.response.*;
import readit.auth.dto.AuthCredentials;
import readit.auth.presentation.Auth;


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

    @GetMapping("/myarticle")
    public ResponseEntity<GetMemberArticleListResponse> getMyArticle(@Auth AuthCredentials authCredentials){
        GetMemberArticleListResponse articleResponse = articleService.getMyArticle(authCredentials.id());
        return ResponseEntity.ok(articleResponse);
    }

    @GetMapping("/stats")
    public ResponseEntity<GetStatsResponse> getStats(@Auth AuthCredentials authCredentials){
        GetStatsResponse statsResponse = articleService.getStats(authCredentials.id());
        return ResponseEntity.ok(statsResponse);
    }

    @GetMapping("/search")
    public ResponseEntity<GetSearchListResponse> getSearchList(@RequestParam String category,
                                                                 @RequestParam String title,
                                                                 @RequestParam String content,
                                                                 @RequestParam String reporter,
                                                                 @RequestParam Boolean isMemberArticle,
                                                                 @RequestParam Boolean hit,
                                                                 @RequestParam Integer cursor,
                                                                 @RequestParam  Integer limit){
        GetSearchListResponse searchListResponse = articleService.getSearchList(category,title,content,reporter,isMemberArticle,hit,cursor,limit);
        return ResponseEntity.ok(searchListResponse);
    }
}
