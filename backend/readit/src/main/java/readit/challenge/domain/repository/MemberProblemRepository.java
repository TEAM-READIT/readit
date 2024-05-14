package readit.challenge.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.article.domain.Article;
import readit.challenge.domain.MemberProblem;
import readit.member.domain.Member;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MemberProblemRepository extends JpaRepository<MemberProblem,Integer> {

    List<MemberProblem> findByMemberAndArticle(Member member, Article article);

    List<MemberProblem> findByMemberAndSolvedAt(Member member, LocalDate solvedAt);
    List<MemberProblem> findByMember_IdAndSolvedAt(Integer memberId, LocalDate solvedAt);
}
