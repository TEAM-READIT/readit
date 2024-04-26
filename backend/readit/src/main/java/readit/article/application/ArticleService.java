package readit.article.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;
import readit.article.domain.repository.ArticleRepository;
import readit.article.dto.GetArticleResponse;
import readit.article.dto.GetEpigraphyResponse;
import readit.article.dto.GetNewsResponse;
import readit.article.dto.GetPopularArticleResponse;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public GetPopularArticleResponse getPopularArticles(){
        List<Article> articleList = articleRepository.findTop3ByOrderByHitDesc();
        List<Article> epigraphyList = articleRepository.findTop3ByTypeOrderByHitDesc(ArticleType.EPIGRAPHY);
        List<Article> newsList = articleRepository.findTop3ByTypeOrderByHitDesc(ArticleType.NEWS);

        return GetPopularArticleResponse.from(articleList,epigraphyList,newsList);
    }
}
