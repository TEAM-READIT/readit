package readit.article.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.article.domain.Article;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
}
