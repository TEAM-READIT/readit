package readit.article.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;
import readit.article.domain.Category;
import readit.article.domain.repository.ArticleQueryRepository;
import readit.article.domain.repository.ArticleRepository;
import readit.article.domain.repository.CategoryRepository;
import readit.article.dto.Page;
import readit.article.dto.response.*;
import readit.article.exception.ArticleNotFoundException;
import readit.article.exception.MemberArticleNotFoundException;
import readit.article.infra.FastAPIClient;
import readit.viewer.domain.entity.MemberArticle;
import readit.viewer.domain.repository.MemberArticleRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleQueryRepository articleQueryRepository;
    private final CategoryRepository categoryRepository;
    private final MemberArticleRepository memberArticleRepository;
    private final FastAPIClient fastAPIClient;

    @Transactional(readOnly = true)
    public GetPopularArticleResponse getPopularArticles(){
        List<Article> articleList = Optional.ofNullable(articleRepository.findTop4ByOrderByHitDesc())
                .filter(list -> !list.isEmpty())
                .orElseThrow(ArticleNotFoundException::new);

        List<Article> epigraphyList = Optional.ofNullable(articleRepository.findTop4ByTypeOrderByHitDesc(ArticleType.EPIGRAPHY))
                .filter(list -> !list.isEmpty())
                .orElseThrow(ArticleNotFoundException::new);

        List<Article> newsList = Optional.ofNullable(articleRepository.findTop4ByTypeOrderByHitDesc(ArticleType.NEWS))
                .filter(list -> !list.isEmpty())
                .orElseThrow(ArticleNotFoundException::new);

        return GetPopularArticleResponse.from(articleList,epigraphyList,newsList);
    }

    public GetArticleFromLinkResponse getArticleFromLink(String link){
        FastAPIArticleResponse response = fastAPIClient.getArticle(link);
        saveArticleFromLink(response);
        return GetArticleFromLinkResponse.from(response);
    }

    @Transactional(readOnly = true)
    public GetMemberArticleListResponse getMyArticle(Integer id){
        List<MemberArticle> memberArticleList = Optional.ofNullable(memberArticleRepository.findMemberArticleByMemberId(id))
                .filter(list -> !list.isEmpty())
                .orElseThrow(MemberArticleNotFoundException::new);

        return GetMemberArticleListResponse.from(memberArticleList);
    }

    @Transactional(readOnly = true)
    public GetStatsResponse getStats(Integer id){
        List<MemberArticle> memberArticleList = Optional.ofNullable(memberArticleRepository.findMemberArticleByMemberId(id))
                .filter(list -> !list.isEmpty())
                .orElseThrow(MemberArticleNotFoundException::new);

        return GetStatsResponse.from(memberArticleList);
    }

    @Transactional(readOnly = true)
    public GetMemberArticleSearchResponse getMyArticleSearchList(String category, String title, String content, String reporter, Boolean hit, Integer cursor, Integer limit){
        MemberArticle memberArticle = memberArticleRepository.getById(cursor);
        Integer hitCursor = Optional.ofNullable(memberArticle)
                .map(m -> memberArticle.getArticle().getHit())
                .orElse(null);;
        Page<MemberArticle> searchList = articleQueryRepository.findMemberArticleWithFilter(hitCursor,category,title,content,reporter,hit,cursor,limit);
        return GetMemberArticleSearchResponse.from(searchList);
    }

    @Transactional(readOnly = true)
    public GetArticleSearchResponse getArticleSearchList(String category, String title, String content, String reporter, Boolean hit, Integer cursor, Integer limit){
        Article article = articleRepository.getById(cursor);
        Integer hitCursor = Optional.ofNullable(article)
                .map(Article::getHit)
                .orElse(null);;
        Page<Article> searchList = articleQueryRepository.findArticleWithFilter(hitCursor,category,title,content,reporter,hit,cursor,limit);
        return GetArticleSearchResponse.from(searchList);
    }

    public void saveArticleFromLink(FastAPIArticleResponse response){
        Category category = categoryRepository.getByName(response.category());
        articleRepository.save(FastAPIArticleResponse.toEntity(response,category));
    }

    public void updateHit(Integer id){
        Article article = articleRepository.getById(id);
        article.increaseHit();
        articleRepository.save(article);
    }

}