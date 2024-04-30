package readit.article.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.article.domain.Category;
import readit.article.exception.CategoryNotFoundException;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
    Optional<Category> findByName(String name);
    default Category getByName(String name){
        return findByName(name)
                .orElseThrow(CategoryNotFoundException::new);
    }
}
