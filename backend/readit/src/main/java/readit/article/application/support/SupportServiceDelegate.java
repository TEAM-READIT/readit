package readit.article.application.support;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;
import readit.article.domain.repository.ArticleRepository;
import readit.article.exception.ArticleNotFoundException;
import readit.article.exception.MemberArticleNotFoundException;
import readit.viewer.domain.entity.MemberArticle;
import readit.viewer.domain.repository.MemberArticleRepository;

import java.util.List;
import java.util.function.Supplier;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SupportServiceDelegate {

    private final ArticleRepository articleRepository;
    private final MemberArticleRepository memberArticleRepository;

    public <T> List<T> supportEmptyToException(Supplier<List<T>> supplier, RuntimeException exception) {
        return Optional.ofNullable(supplier.get())
                .filter(list -> !list.isEmpty())
                .orElseThrow(() -> exception);
    }

    public Integer getHitCursor(Article article){
        return Optional.ofNullable(article)
                .map(Article::getHit)
                .orElse(null);
    }

    public List<Article> getArticleList() {
        return supportEmptyToException(articleRepository::findTop4ByOrderByHitDesc, new ArticleNotFoundException());
    }

    public List<Article> getArticleListByType(ArticleType type) {
        return supportEmptyToException(() -> articleRepository.findTop4ByTypeOrderByHitDesc(type), new ArticleNotFoundException());
    }

    public List<MemberArticle> getMemberArticleListByMemberId(Integer id) {
        return supportEmptyToException(() -> memberArticleRepository.findMemberArticleByMemberId(id), new MemberArticleNotFoundException());
    }



}
