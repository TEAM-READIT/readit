package readit.article.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    List<Article> findTop4ByOrderByHitDesc();
    List<Article> findTop4ByTypeOrderByHitDesc(ArticleType type);

    Optional<Article> findById(Integer Id);

    default Article getById(Integer id){
        return findById(id).orElse(null);
    }

    @Query("UPDATE Article a SET a.words = :words WHERE a.id = :articleId")
    void updateWordsByArticleId(Integer articleId, String words);

    @Modifying
    @Query("UPDATE Article a SET a.hasWord = true WHERE a.id = :articleId")
    void updateHasWordToTrue(Integer articleId);
}
