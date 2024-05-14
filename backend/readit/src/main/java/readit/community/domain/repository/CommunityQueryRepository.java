package readit.community.domain.repository;

import com.querydsl.core.types.NullExpression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.BooleanUtils;
import org.springframework.stereotype.Repository;
import readit.article.dto.Page;
import readit.community.domain.entity.Community;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static readit.community.domain.entity.QCommunity.community;

@Repository
@RequiredArgsConstructor
public class CommunityQueryRepository {
    private final JPAQueryFactory queryFactory;

    public Page<Community> findCommunityWithFilter(Integer hitCursor, String category, String title, String content, String writerName,
                                                   Integer maxParticipants, Integer cursor, Boolean hit, Integer limit){
        List<Community> communityList = queryFactory // 모든 글 목록
                .selectFrom(community)
                .where(
                        eqCommunityCursor(hit, cursor, hitCursor),
                        eqCommunityHitCursor(hit, cursor),
                        eqCommunityCategory(category),
                        eqCommunityTitle(title),
                        eqCommunityContent(content),
                        eqCommunityWriter(writerName),
                        eqCommunityMaxParticipants(maxParticipants),
                        eqCommunityEndAt(LocalDate.now())
                )
                .orderBy(sortCommunityById())
                .orderBy(sortCommunityByHit(hit))
                .limit(limit+1)
                .fetch();
        return new Page<>(communityList, limit);
    }

    public BooleanExpression eqCommunityCursor(Boolean hit, Integer cursor, Integer hitCursor){
        return Optional.ofNullable(hit)
                .flatMap(isHit -> {
                    if (isHit) {
                        return Optional.ofNullable(hitCursor).map(community.hits::loe);
                    } else {
                        if (cursor != 0) {
                            return Optional.ofNullable(cursor).map(community.id::lt);
                        } else {
                            return Optional.ofNullable(cursor).map(community.id::gt);
                        }
                    }
                })
                .orElse(null);
    }
    public BooleanExpression eqCommunityHitCursor(Boolean hit, Integer cursor){
        return Optional.ofNullable(hit)
                .filter(Boolean::booleanValue)
                .flatMap(h -> Optional.ofNullable(cursor))
                .map(community.id::gt)
                .orElse(null);
    }

    public OrderSpecifier<?> sortCommunityByHit(Boolean hit){
        if(BooleanUtils.isTrue(hit)){
            return new OrderSpecifier<>(Order.DESC,community.hits);
        }
        else{
            return new OrderSpecifier(Order.ASC, NullExpression.DEFAULT, OrderSpecifier.NullHandling.Default);
        }
    }

    public OrderSpecifier<?> sortCommunityById() {
            return new OrderSpecifier<>(Order.DESC, community.id);
    }

    public BooleanExpression eqCommunityCategory(String category){
        return Optional.ofNullable(category)
                .map(community.category.name::eq)
                .orElse(null);
    }

    public BooleanExpression eqCommunityTitle(String title){
        return Optional.ofNullable(title)
                .map(community.title::contains)
                .orElse(null);
    }

    public BooleanExpression eqCommunityContent(String content){
        return Optional.ofNullable(content)
                .map(community.content::contains)
                .orElse(null);
    }

    public BooleanExpression eqCommunityWriter(String writer){
        return Optional.ofNullable(writer)
                .map(community.member.name::contains)
                .orElse(null);
    }

    public BooleanExpression eqCommunityEndAt(LocalDate endAt) {
        return Optional.ofNullable(endAt)
                .map(community.endAt::goe)
                .orElse(null);
    }

    public BooleanExpression eqCommunityMaxParticipants(Integer maxParticipants) {
        return Optional.ofNullable(maxParticipants)
                .map(community.maxParticipants::eq)
                .orElse(null);
    }

}
