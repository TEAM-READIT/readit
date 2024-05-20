package readit.challenge.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import readit.article.domain.Article;
import readit.challenge.domain.MemberProblem;
import readit.challenge.exception.MemberProblemNotFoundException;
import readit.member.domain.Member;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MemberProblemRepository extends JpaRepository<MemberProblem,Integer> {
    Optional<MemberProblem> findByMember(Member member);

    default MemberProblem getByMember(Member member){
        return findByMember(member)
                .orElseThrow(MemberProblemNotFoundException::new);
    }

    List<MemberProblem> findByMemberAndArticle(Member member, Article article);

    List<MemberProblem> findByMemberAndSolvedAt(Member member, LocalDate solvedAt);
}
