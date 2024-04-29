package readit.article.domain.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;
import readit.article.exception.ArticleNotFoundException;

import static readit.article.domain.QArticle.article;

import java.util.List;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements CustomArticleRepository{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Article> findHotArticle() {
        List<Article> articles = queryFactory
                .select(article)
                .from(article)
                .orderBy(article.hit.desc())
                .limit(3)
                .fetch();
        if (articles == null || articles.isEmpty())
            throw new ArticleNotFoundException();
        return articles;
    }

    @Override
    public List<Article> findHotArticleByType(ArticleType articleType) {
        List<Article> articles = queryFactory
                .select(article)
                .from(article)
                .orderBy(article.hit.desc())
                .where(article.type.eq(articleType))
                .limit(3)
                .fetch();
        if (articles == null || articles.isEmpty())
            throw new ArticleNotFoundException();
        return articles;
    }
}
