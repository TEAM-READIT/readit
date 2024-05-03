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
import readit.article.dto.response.*;
import readit.article.exception.ArticleNotFoundException;
import readit.article.exception.MemberArticleNotFoundException;
import readit.article.infra.FastAPIClient;
import readit.viewer.domain.entity.MemberArticle;
import readit.viewer.domain.entity.Memo;
import readit.viewer.domain.repository.MemberArticleRepository;
import readit.viewer.domain.repository.MemoRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleQueryRepository articleQueryRepository;
    private final CategoryRepository categoryRepository;
    private final MemberArticleRepository memberArticleRepository;
    private final MemoRepository memoRepository;
    private final FastAPIClient fastAPIClient;

    @Transactional(readOnly = true)
    public GetPopularArticleResponse getPopularArticles(){
        List<Article> articleList = articleRepository.findTop3ByOrderByHitDesc();
        if (articleList == null || articleList.isEmpty())
            throw new ArticleNotFoundException();
        List<Article> epigraphyList = articleRepository.findTop3ByTypeOrderByHitDesc(ArticleType.EPIGRAPHY);
        if (epigraphyList == null || epigraphyList.isEmpty())
            throw new ArticleNotFoundException();
        List<Article> newsList = articleRepository.findTop3ByTypeOrderByHitDesc(ArticleType.NEWS);
        if (newsList == null || newsList.isEmpty())
            throw new ArticleNotFoundException();

        return GetPopularArticleResponse.from(articleList,epigraphyList,newsList);
    }

    public GetArticleFromLinkResponse getArticleFromLink(String link){
        FastAPIArticleResponse response = fastAPIClient.getArticle(link);
        saveArticleFromLink(response);
        return GetArticleFromLinkResponse.from(response);
    }

    @Transactional(readOnly = true)
    public GetMemberArticleListResponse getMyArticle(Integer id){
        List<MemberArticle> memberArticleList = memberArticleRepository.findMemberArticleByMemberId(id);
        if(memberArticleList==null || memberArticleList.isEmpty()){
            throw new MemberArticleNotFoundException();
        }
        return GetMemberArticleListResponse.from(memberArticleList);
    }

    @Transactional(readOnly = true)
    public GetStatsResponse getStats(Integer id){
        List<MemberArticle> memberArticleList =  memberArticleRepository.findMemberArticleByMemberId(id);
        if(memberArticleList==null || memberArticleList.isEmpty()){
            throw new MemberArticleNotFoundException();
        }
        return GetStatsResponse.from(memberArticleList);
    }

    @Transactional(readOnly = true)
    public GetSearchListResponse getSearchList(String category, String title, String content, String reporter, Boolean isMemberArticle, Boolean hit, Integer cursor, Integer limit){
        if(isMemberArticle){
            List<Article> searchList = articleQueryRepository.findArticleWithFilter(category,title,content,reporter,hit,cursor,limit);
            return GetSearchListResponse.from(searchList,null);
        } else {
            List<MemberArticle> searchList = articleQueryRepository.findMemberArticleWithFilter(category,title,content,reporter,hit,cursor,limit);
            List<Memo> memoList = memoRepository.findAllByMemberArticle_Id();
            return GetSearchListResponse.from(searchList,memoList);
        }
    }

    public void saveArticleFromLink(FastAPIArticleResponse response){
        Category category = categoryRepository.getByName(response.category());
        articleRepository.save(FastAPIArticleResponse.toEntity(response,category));
    }
}