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
import readit.article.dto.response.GetMemberArticleResponse;
import readit.article.exception.ArticleNotFoundException;
import readit.viewer.domain.entity.MemberArticle;

import java.util.List;

import static java.util.stream.Collectors.toList;
import static readit.article.domain.QArticle.article;
import static readit.viewer.domain.entity.QMemberArticle.memberArticle;

@Repository
@RequiredArgsConstructor
public class ArticleQueryRepository {
        private final JPAQueryFactory queryFactory;

        public List<Article> findArticleWithFilter(String category, String title, String content, String reporter, Boolean hit, Integer cursor, Integer limit){
                List<Article> articleList = queryFactory // 모든 글 목록
                        .selectFrom(article)
                        .where(
                                eqCategory(category),
                                eqTitle(title),
                                eqContent(content),
                                eqReporter(reporter)
                        )
                        .orderBy(sortByHit(hit))
                        .fetch();
                if (articleList == null || articleList.isEmpty())
                    throw new ArticleNotFoundException();
                return articleList;
            // TODO: Cursor, limit
        }

    public List<MemberArticle> findMemberArticleWithFilter(String category, String title, String content, String reporter, Boolean hit, Integer cursor, Integer limit){
        List<MemberArticle> memberArticleList = queryFactory
                .selectFrom(memberArticle)
                .where(
                        eqCategory(category),
                        eqTitle(title),
                        eqContent(content),
                        eqReporter(reporter)
                )
                .orderBy(sortByHit(hit))
                .fetch();
        if (memberArticleList == null || memberArticleList.isEmpty())
            throw new ArticleNotFoundException();
        return memberArticleList;
        // TODO: Cursor, limit
    }

        public OrderSpecifier<?> sortByHit(Boolean hit){
            if(hit == null){
                return new OrderSpecifier(Order.ASC, NullExpression.DEFAULT, OrderSpecifier.NullHandling.Default);
            }
            else if(BooleanUtils.isTrue(hit)){
                return new OrderSpecifier<>(Order.ASC, article.hit);
            }
            else {
                return new OrderSpecifier<>(Order.DESC, article.hit);
            }
        }

        public BooleanExpression eqContent(String content){
            if(StringUtils.isNullOrEmpty(content)){
                return null;
            }

            return article.content.contains(content);
        }

        public BooleanExpression eqReporter(String reporter){
            if(StringUtils.isNullOrEmpty(reporter)){
                return null;
            }

            return article.reporter.eq(reporter);
        }

        public BooleanExpression eqTitle(String title){
            if(StringUtils.isNullOrEmpty(title)){
                return null;
            }

            return article.title.eq(title);
        }

        public BooleanExpression eqCategory(String category){
            if(StringUtils.isNullOrEmpty(category)){
                return null;
            }

            return article.category.name.eq(category);
        }
}
