package readit.article.domain.repository;

import com.querydsl.core.types.NullExpression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
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

    public Page<Article> findArticleWithFilter(Integer hitCursor, String category, String title, String content, String reporter, Boolean hit, Integer cursor, Integer limit){
        List<Article> articles = queryFactory // 모든 글 목록
                .selectFrom(article)
                .where(
                        eqArticleCursor(hit,cursor,hitCursor),
                        eqArticleHitCursor(hit,cursor),
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

    public Page<MemberArticle> findMemberArticleWithFilter(Integer hitCursor, String category, String title, String content, String reporter, Boolean hit, Integer cursor, Integer limit){
        List<MemberArticle> memberArticles =  queryFactory
                .selectFrom(memberArticle)
                .where(
                        eqMemberArticleCursor(hit,cursor,hitCursor),
                        eqMemberArticleHitCursor(hit,cursor),
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

    public BooleanExpression eqArticleCursor(Boolean hit, Integer cursor,Integer hitCursor){
        if(hit){
            return Optional.ofNullable(hitCursor)
                    .map(article.hit::loe)
                    .orElse(null);
        } else{
            return Optional.ofNullable(cursor)
                    .map(article.id::gt)
                    .orElse(null);
        }
    }

    public BooleanExpression eqArticleHitCursor(Boolean hit, Integer cursor){
        if(hit){
            return Optional.ofNullable(cursor)
                    .map(article.id::gt)
                    .orElse(null);
        } else return null;
    }

    public BooleanExpression eqMemberArticleHitCursor(Boolean hit, Integer cursor){
        if(hit){
            return Optional.ofNullable(cursor)
                    .map(memberArticle.article.id::gt)
                    .orElse(null);
        } else return null;
    }

    public BooleanExpression eqMemberArticleCursor(Boolean hit, Integer cursor,Integer hitCursor){
        if(hit){
            return Optional.ofNullable(hitCursor)
                    .map(memberArticle.article.hit::loe)
                    .orElse(null);
        } else{
            return Optional.ofNullable(cursor)
                    .map(memberArticle.article.id::gt)
                    .orElse(null);
        }
    }

    public OrderSpecifier<?> sortArticleByHit(Boolean hit){
        if(BooleanUtils.isTrue(hit)){
            return new OrderSpecifier<>(Order.DESC,article.hit);
        }
        else{
            return new OrderSpecifier(Order.ASC, NullExpression.DEFAULT, OrderSpecifier.NullHandling.Default);
        }
    }

    public OrderSpecifier<?> sortMemberArticleByHit(Boolean hit){
        if(BooleanUtils.isTrue(hit)){
            return new OrderSpecifier<>(Order.DESC,memberArticle.article.hit);
        }
        else{
            return new OrderSpecifier(Order.ASC, NullExpression.DEFAULT, OrderSpecifier.NullHandling.Default);
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
