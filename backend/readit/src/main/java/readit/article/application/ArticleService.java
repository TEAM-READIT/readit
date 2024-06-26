package readit.article.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.article.application.support.SupportServiceDelegate;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;
import readit.article.domain.Category;
import readit.article.domain.repository.ArticleQueryRepository;
import readit.article.domain.repository.ArticleRepository;
import readit.article.domain.repository.CategoryRepository;
import readit.article.dto.Page;
import readit.article.dto.response.*;
import readit.article.infra.FastAPIClient;
import readit.viewer.domain.entity.MemberArticle;
import readit.viewer.domain.entity.Memo;
import readit.viewer.domain.repository.MemberArticleRepository;
import readit.viewer.domain.repository.MemoRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final MemoRepository memoRepository;
    private final ArticleQueryRepository articleQueryRepository;
    private final CategoryRepository categoryRepository;
    private final MemberArticleRepository memberArticleRepository;
    private final FastAPIClient fastAPIClient;
    private final SupportServiceDelegate supportServiceDelegate;

    @Transactional(readOnly = true)
    @Cacheable(value = "popularArticles")
    public GetPopularArticleResponse getPopularArticles(){
        List<Article> articleList = supportServiceDelegate.getArticleList();
        List<Article> epigraphyList = supportServiceDelegate.getArticleListByType(ArticleType.EPIGRAPHY);
        List<Article> newsList = supportServiceDelegate.getArticleListByType(ArticleType.NEWS);

        return GetPopularArticleResponse.from(articleList,epigraphyList,newsList);
    }

    public GetArticleFromLinkResponse getArticleFromLink(String link){
        FastAPIArticleResponse response = fastAPIClient.getArticle(link);
        Integer id = saveArticleFromLink(response);

        return GetArticleFromLinkResponse.from(response,id);
    }

    @Transactional(readOnly = true)
    public GetMemberArticleListResponse getMyArticle(Integer id){
        List<MemberArticle> memberArticleList = supportServiceDelegate.getMemberArticleListByMemberId(id);

        return GetMemberArticleListResponse.from(memberArticleList);
    }

    @Transactional(readOnly = true)
    public GetStatsResponse getStats(Integer id){
        List<MemberArticle> memberArticleList = supportServiceDelegate.getCompleteArticle(id);

        return GetStatsResponse.from(memberArticleList);
    }

    @Transactional(readOnly = true)
    public GetMemberArticleSearchResponse getMyArticleSearchList(Integer id,String category, String title, String content, String reporter, Boolean hit, Integer cursor, Integer limit, Boolean isComplete){
        MemberArticle memberArticle = memberArticleRepository.getById(id,cursor);
        Integer hitCursor = Optional.ofNullable(memberArticle)
                .map(m -> memberArticle.getArticle().getHit())
                .orElse(null);;
        Page<MemberArticle> searchList = articleQueryRepository.findMemberArticleWithFilter(id,hitCursor,category,title,content,reporter,hit,cursor,limit,isComplete);
        return GetMemberArticleSearchResponse.from(searchList);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "articleSearch")
    public GetArticleSearchResponse getArticleSearchList(String category, String title, String content, String reporter, Boolean hit, Integer cursor, Integer limit){
        Article article = articleRepository.getById(cursor);
        Integer hitCursor = Optional.ofNullable(article)
                .map(Article::getHit)
                .orElse(null);
        Page<Article> searchList = articleQueryRepository.findArticleWithFilter(hitCursor,category,title,content,reporter,hit,cursor,limit);
        return GetArticleSearchResponse.from(searchList);
    }

    public GetRecentMemberArticlesResponse getRecentMyArticles(Integer id, Boolean isComplete){
        if(isComplete){
            return GetRecentMemberArticlesResponse.from(supportServiceDelegate.getRecentCompleteArticle(id));
        } else {
            return GetRecentMemberArticlesResponse.from(supportServiceDelegate.getRecentTempArticles(id));
        }
    }

    public Integer saveArticleFromLink(FastAPIArticleResponse response){
        Category category = categoryRepository.getByName(response.category());
        Article article = articleRepository.save(FastAPIArticleResponse.toEntity(response,category));

        return article.getId();
    }

    public void updateHit(Integer id){
        Article article = articleRepository.getById(id);
        article.increaseHit();
        articleRepository.save(article);
    }

    public GetMemoListResponse getMemoList(Integer id){
        List<Memo> memoList = memoRepository.findByMemberArticleId(id);
        return GetMemoListResponse.from(memoList);
    }
}