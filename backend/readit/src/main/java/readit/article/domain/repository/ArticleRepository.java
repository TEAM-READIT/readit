package readit.article.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;

import java.util.List;


public interface ArticleRepository extends JpaRepository<Article, Integer> {
    @Transactional
    @Modifying
    @Query("UPDATE Article a SET a.words = :words WHERE a.id = :articleId")
    void updateWordsByArticleId(Integer articleId, String words);

    @Transactional
    @Modifying
    @Query("UPDATE Article a SET a.hasWord = true WHERE a.id = :articleId")
    void updateHasWordToTrue(Integer articleId);

    List<Article> findTop3ByOrderByHitDesc();
    List<Article> findTop3ByTypeOrderByHitDesc(ArticleType type);

}
