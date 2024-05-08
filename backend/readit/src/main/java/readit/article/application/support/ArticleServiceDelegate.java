package readit.article.application.support;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;
import readit.article.domain.repository.ArticleRepository;
import readit.article.exception.ArticleNotFoundException;
import java.util.List;
import java.util.function.Supplier;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ArticleServiceDelegate {

    private final ArticleRepository articleRepository;

    public <T> List<T> supportEmptyAndException(Supplier<List<T>> supplier, RuntimeException exception) {
        return Optional.ofNullable(supplier.get())
                .filter(list -> !list.isEmpty())
                .orElseThrow(() -> exception);
    }

    public List<Article> getArticleList() {
        return supportEmptyAndException(articleRepository::findTop4ByOrderByHitDesc, new ArticleNotFoundException());
    }

    public List<Article> getArticleListByType(ArticleType type) {
        return supportEmptyAndException(() -> articleRepository.findTop4ByTypeOrderByHitDesc(type), new ArticleNotFoundException());

    }

}
