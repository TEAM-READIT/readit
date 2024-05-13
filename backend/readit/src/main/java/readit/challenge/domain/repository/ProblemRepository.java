package readit.challenge.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.article.domain.Article;
import readit.challenge.domain.Problem;
import readit.challenge.exception.ProblemNotFoundException;

import java.util.List;
import java.util.Optional;

public interface ProblemRepository extends JpaRepository<Problem,Integer> {

    Optional<List<Problem>> findByArticle(Article article);
    default List<Problem> getByArticle(Article article){
        return findByArticle(article)
                .orElseThrow(ProblemNotFoundException::new);
    }
}
