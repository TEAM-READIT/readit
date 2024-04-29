package readit.article.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;
import readit.article.domain.repository.ArticleRepository;
import readit.article.dto.GetPopularArticleResponse;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    @Transactional(readOnly = true)
    public GetPopularArticleResponse getPopularArticles(){
        List<Article> articleList = articleRepository.findHotArticle();
        List<Article> epigraphyList = articleRepository.findHotArticleByType(ArticleType.EPIGRAPHY);
        List<Article> newsList = articleRepository.findHotArticleByType(ArticleType.NEWS);

        return GetPopularArticleResponse.from(articleList,epigraphyList,newsList);
    }
}
