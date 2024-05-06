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
        if(cursor==null){
            return null;
        }

        return article.id.gt(cursor);
    }

    public BooleanExpression eqMemberArticleCursor(Integer cursor){
        if(cursor==null){
            return null;
        }

        return memberArticle.article.id.gt(cursor);
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
        if(StringUtils.isNullOrEmpty(content)){
            return null;
        }

        return article.content.contains(content);
    }

    public BooleanExpression eqMemberArticleContent(String content){
        if(StringUtils.isNullOrEmpty(content)){
            return null;
        }

        return memberArticle.content.contains(content);
    }

    public BooleanExpression eqArticleReporter(String reporter){
        if(StringUtils.isNullOrEmpty(reporter)){
            return null;
        }

        return article.reporter.contains(reporter);
    }

    public BooleanExpression eqMemberArticleReporter(String reporter){
        if(StringUtils.isNullOrEmpty(reporter)){
            return null;
        }

        return memberArticle.article.reporter.contains(reporter);
    }

    public BooleanExpression eqArticleTitle(String title){
        if(StringUtils.isNullOrEmpty(title)){
            return null;
        }

        return article.title.contains(title);
    }

    public BooleanExpression eqMemberArticleTitle(String title){
        if(StringUtils.isNullOrEmpty(title)){
            return null;
        }

        return memberArticle.article.title.contains(title);
    }

    public BooleanExpression eqArticleCategory(String category){
        if(StringUtils.isNullOrEmpty(category)){
            return null;
        }

        return article.category.name.eq(category);
    }

    public BooleanExpression eqMemberArticleCategory(String category){
        if(StringUtils.isNullOrEmpty(category)){
            return null;
        }

        return memberArticle.article.category.name.eq(category);
    }
}
