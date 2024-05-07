package readit.article.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;
import readit.article.exception.ArticleNotFoundException;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    List<Article> findTop3ByOrderByHitDesc();
    List<Article> findTop3ByTypeOrderByHitDesc(ArticleType type);

    default Article getById(Integer id){
        return findById(id).orElse(null);
    }

    @Query("UPDATE Article a SET a.words = :words WHERE a.id = :articleId")
    void updateWordsByArticleId(Integer articleId, String words);

    @Modifying
    @Query("UPDATE Article a SET a.hasWord = true WHERE a.id = :articleId")
    void updateHasWordToTrue(Integer articleId);

}
