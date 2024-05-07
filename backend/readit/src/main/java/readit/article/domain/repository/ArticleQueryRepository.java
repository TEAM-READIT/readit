package readit.article.domain.repository;

import com.querydsl.core.types.NullExpression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.util.StringUtils;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.BooleanUtils;
import org.springframework.stereotype.Repository;
import readit.article.domain.Article;
import readit.article.dto.Page;
import readit.viewer.domain.entity.MemberArticle;

import java.util.List;
import java.util.Optional;

import static readit.article.domain.QArticle.article;
import static readit.viewer.domain.entity.QMemberArticle.memberArticle;

@Repository
@RequiredArgsConstructor
public class ArticleQueryRepository {
    private final JPAQueryFactory queryFactory;

    public Page<Article> findArticleWithFilter(String category, String title, String content, String reporter, Boolean hit, Integer cursor, Integer limit){
        List<Article> articles = queryFactory // 모든 글 목록
                .selectFrom(article)
                .where(
                        eqArticleCursor(cursor),
                        eqArticleCategory(category),
                        eqArticleTitle(title),
                        eqArticleContent(content),
                        eqArticleReporter(reporter)
                )
                .orderBy(sortArticleByHit(hit))
                .limit(limit+1)
                .fetch();
        return new Page<>(articles,limit);
    }

    public Page<MemberArticle> findMemberArticleWithFilter(String category, String title, String content, String reporter, Boolean hit, Integer cursor, Integer limit){
        List<MemberArticle> memberArticles =  queryFactory
                .selectFrom(memberArticle)
                .where(
                        eqMemberArticleCursor(cursor),
                        eqMemberArticleCategory(category),
                        eqMemberArticleTitle(title),
                        eqMemberArticleContent(content),
                        eqMemberArticleReporter(reporter)
                )
                .orderBy(sortMemberArticleByHit(hit))
                .limit(limit+1)
                .fetch();
        return new Page<>(memberArticles,limit);
    }

    public BooleanExpression eqArticleCursor(Integer cursor){
        return Optional.ofNullable(cursor)
                .map(article.id::gt)
                .orElse(null);
    }

    public BooleanExpression eqMemberArticleCursor(Integer cursor){
        return Optional.ofNullable(cursor)
                .map(memberArticle.article.id::gt)
                .orElse(null);
    }

    public OrderSpecifier<?> sortArticleByHit(Boolean hit){
        if(hit == null){
            return new OrderSpecifier(Order.ASC, NullExpression.DEFAULT, OrderSpecifier.NullHandling.Default);
        }
        else if(BooleanUtils.isTrue(hit)){
            return new OrderSpecifier<>(Order.ASC,article.hit);
        }
        else {
            return new OrderSpecifier<>(Order.DESC, article.hit);
        }
    }

    public OrderSpecifier<?> sortMemberArticleByHit(Boolean hit){
        if(hit == null){
            return new OrderSpecifier(Order.ASC, NullExpression.DEFAULT, OrderSpecifier.NullHandling.Default);
        }
        else if(BooleanUtils.isTrue(hit)){
            return new OrderSpecifier<>(Order.ASC,memberArticle.article.hit);
        }
        else {
            return new OrderSpecifier<>(Order.DESC, memberArticle.article.hit);
        }
    }

    public BooleanExpression eqArticleContent(String content){
        return Optional.ofNullable(content)
                .map(article.content::contains)
                .orElse(null);
    }

    public BooleanExpression eqMemberArticleContent(String content){
        return Optional.ofNullable(content)
                .map(memberArticle.content::contains)
                .orElse(null);
    }

    public BooleanExpression eqArticleReporter(String reporter){
        return Optional.ofNullable(reporter)
                .map(article.reporter::contains)
                .orElse(null);
    }

    public BooleanExpression eqMemberArticleReporter(String reporter){
        return Optional.ofNullable(reporter)
                .map(memberArticle.article.reporter::contains)
                .orElse(null);
    }

    public BooleanExpression eqArticleTitle(String title){
        return Optional.ofNullable(title)
                .map(article.title::contains)
                .orElse(null);
    }

    public BooleanExpression eqMemberArticleTitle(String title){
        return Optional.ofNullable(title)
                .map(memberArticle.article.title::contains)
                .orElse(null);
    }

    public BooleanExpression eqArticleCategory(String category){
        return Optional.ofNullable(category)
                .map(article.category.name::eq)
                .orElse(null);
    }

    public BooleanExpression eqMemberArticleCategory(String category){
        return Optional.ofNullable(category)
                .map(memberArticle.article.category.name::eq)
                .orElse(null);
    }
}
