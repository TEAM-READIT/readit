package readit.article.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article,Integer>, CustomArticleRepository {

}

interface CustomArticleRepository {
    List<Article> findHotArticle();
    List<Article> findHotArticleByType(ArticleType articleType);
}