package readit.challenge.domain.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import readit.article.domain.Article;
import readit.article.dto.Page;
import readit.challenge.domain.MemberProblem;

import java.util.List;

import static readit.challenge.domain.QMemberProblem.memberProblem;

@Repository
@RequiredArgsConstructor
public class MemberProblemQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<MemberProblem> findDateScore(Integer memberId){
        return queryFactory
                .selectFrom(memberProblem)
                .where(memberProblem.member.id.eq(memberId)
                        .and(memberProblem.createdAt.in(
                                JPAExpressions
                                        .select(memberProblem.createdAt.max())
                                        .from(memberProblem)
                                        .where(memberProblem.member.id.eq(memberId))
                                        .groupBy(memberProblem.solvedAt)
                        ))
                )
                .fetch();
    }
}
