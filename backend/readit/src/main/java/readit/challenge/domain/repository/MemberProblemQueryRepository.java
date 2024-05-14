package readit.challenge.domain.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import readit.challenge.domain.MemberProblem;
import readit.challenge.domain.dto.GetTotalScore;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static readit.challenge.domain.QMemberProblem.memberProblem;

@Repository
@RequiredArgsConstructor
public class MemberProblemQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<MemberProblem> findDateScore(Integer memberId){
        LocalDate oneWeekAgo = LocalDate.now().minusDays(6);

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
                        .and(memberProblem.solvedAt.between(oneWeekAgo, LocalDate.now()))
                )
                .fetch();
    }

    public List<GetTotalScore> findTotalDateScore() {
        LocalDate oneWeekAgo = LocalDate.now().minusDays(6);

        Expression<Double> avgScoreExpr = Expressions.numberTemplate(Double.class, "AVG({0})", memberProblem.score);

        List<Tuple> tuples = queryFactory.select(memberProblem.solvedAt, avgScoreExpr)
                .from(memberProblem)
                .where(memberProblem.solvedAt.between(oneWeekAgo, LocalDate.now()))
                .groupBy(memberProblem.solvedAt)
                .orderBy(memberProblem.solvedAt.asc())
                .fetch();

        return tuples.stream()
                .map(tuple -> GetTotalScore.of(tuple.get(memberProblem.solvedAt), tuple.get(avgScoreExpr)))
                .collect(Collectors.toList());
    }
}
