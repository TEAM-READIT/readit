package readit.article.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article,Integer> {
    List<Article> findTop3ByOrderByHitDesc();
    List<Article> findTop3ByTypeOrderByHitDesc(ArticleType type);
}
