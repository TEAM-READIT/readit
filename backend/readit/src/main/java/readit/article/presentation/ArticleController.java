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

    @GetMapping("/search/myarticle")
    public ResponseEntity<GetMemberArticleSearchResponse> getMyArticles(@RequestParam(required = false) String category,
                                                                        @RequestParam(required = false) String title,
                                                                        @RequestParam(required = false) String content,
                                                                        @RequestParam(required = false) String reporter,
                                                                        @RequestParam(defaultValue = "0") Integer cursor,
                                                                        @RequestParam(defaultValue = "false") Boolean hit,
                                                                        @RequestParam(defaultValue = "12")  Integer limit){
        System.out.println(cursor+", 하이");
        GetMemberArticleSearchResponse searchListResponse = articleService.getMyArticleSearchList(category,title,content,reporter,hit,cursor,limit);
        return ResponseEntity.ok(searchListResponse);
    }

    @GetMapping("/search/article")
    public ResponseEntity<GetArticleSearchResponse> getArticles(@RequestParam(required = false) String category,
                                                                @RequestParam(required = false) String title,
                                                                @RequestParam(required = false) String content,
                                                                @RequestParam(required = false) String reporter,
                                                                @RequestParam(defaultValue = "0") Integer cursor,
                                                                @RequestParam(defaultValue = "false") Boolean hit,
                                                                @RequestParam(defaultValue = "12")  Integer limit){
        System.out.println(title+", 하이");
        GetArticleSearchResponse searchListResponse = articleService.getArticleSearchList(category,title,content,reporter,hit,cursor,limit);
        return ResponseEntity.ok(searchListResponse);
    }
}