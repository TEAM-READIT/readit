# [BE] QueryDSL 채택과정

## QueryDSL
- QueryDSL은 정적 타입을 이용해서 SQL과 같은 쿼리를 생성할 수 있도록 해 주는 오픈소스 프레임워크입니다.
- 쿼리를 문자열로 작성하거나 작성하는 것이 아닌, QueryDSL이 제공하는 Fluent API를 이용해 코드 작성의 형식으로 쿼리를 생성할 수 있게 도와줍니다.

> JPA는 객체지향 애플리케이션과 관계형 데이터베이스 사이의 패러다임 불일치를 해결하는 프레임워크입니다.
개발자는 객체지향 관점으로 개발하고 JPA는 SQL 쿼리문을 생성합니다.
SQL문이 자동으로 생성되어 개발자는 SQL 관점 프로그래밍을 하지 않아도 됩니다.
그러나 단순 JPA 만으로는 복잡한 쿼리를 작성하는데 한계가 있어 JPQL을 지원합니다.
그러나 완전한 분리는 불가능합니다. 복잡한 쿼리 생성을 위해, JPA는 JPQL을 지원합니다.

저희 팀은 JPQL도 사용하지만, 일부 API에서는 QueryDSL도 사용하였습니다.


## 우리 팀이 QueryDSL을 사용한 이유

### 타입 안정성
- JPQL은 문자열 형태로 쿼리를 작성하기 때문에 컴파일 단계에서 타입 체크가 불가능하여 잘못 작성한 경우 런타임 에러가 발생합니다.
- 그러나 QueryDSL은 코드 형태로 쿼리를 작성하기 때문에 컴파일 단계에서 타입 체크가 가능합니다.


저희 서비스에서 QueryDSL을 사용한 예시는 다음과 같습니다.
```Java
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
```

### 동적 쿼리
> 실행 시점에 쿼리의 일부가 변경될 수 있는 쿼리

저희 서비스에서는 글 목록과 커뮤니티 목록에서 5가지 이상의 조건으로 검색을 할 수 있습니다. 사용자가 검색을 하는 조건에 따라 런타임에서 쿼리가 동적으로 변경되어야 하기 때문에 동적 쿼리를 구현해야 했습니다.

- JPQL로 동적쿼리를 구현하게 되면, 조건에 따라 if문으로 분기하고, where문을 다르게 가지는 JPQL 생성하게 되어 매우 복잡하고 가독성이 좋지 않은 코드를 작성하게 됩니다.

- 그러나 QueryDSL로 동적쿼리를 구현하면 가독성이 좋고, 메서드 조합 및 재활용이 가능합니다.

저희 서비스에서 QueryDSL로 동적쿼리를 사용한 코드는 다음과 같습니다.

```Java
public Page<MemberArticle> findMemberArticleWithFilter(Integer id,Integer hitCursor, String category, String title, String content, String reporter, Boolean hit, Integer cursor, Integer limit, Boolean isCompleted){
    List<MemberArticle> memberArticles =  queryFactory
            .selectFrom(memberArticle)
            .where(
                    eqMember(id),
                    eqMemberArticleCursor(hit,cursor,hitCursor),
                    eqMemberArticleHitCursor(hit,cursor),
                    eqMemberArticleCategory(category),
                    eqMemberArticleTitle(title),
                    eqMemberArticleContent(content),
                    eqMemberArticleReporter(reporter),
                    eqMemberArticleCompletedAt(isCompleted)
            )
            .orderBy(sortMemberArticleByHit(hit))
            .limit(limit + 1)
            .fetch();
    return new Page<>(memberArticles, limit);
}

public BooleanExpression eqMember(Integer memberId){
    return Optional.ofNullable(memberId)
            .map(memberArticle.memberId::eq)
            .orElse(null);
}

...

```

위와 같은 이유로 저희 팀은,
- JPA 쿼리 메서드로 작성할 수 있는 쿼리는 쿼리 메서드로,
- 쿼리 메서드로 작성하기에는 어렵지만 비교적 단순한 쿼리는 JPQL로,
- 복잡한 쿼리 또는 동적 쿼리는 QueryDSL로 작성하였습니다.