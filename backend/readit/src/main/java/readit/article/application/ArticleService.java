package readit.article.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;
import readit.article.domain.repository.ArticleRepository;
import readit.article.dto.GetPopularArticleResponse;
import readit.article.exception.ArticleNotFoundException;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

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
}