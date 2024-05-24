package readit.member.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import readit.member.domain.Member;
import readit.member.domain.MemberType;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByEmailAndMemberType(String email, MemberType memberType);

    @Query(value = "SELECT m.id, m.name, m.profile, m.challenge_score, RANK() OVER (ORDER BY m.challenge_score DESC) AS `rank` " +
            "FROM member m ORDER BY m.challenge_score DESC LIMIT 7", nativeQuery = true)
    List<Object[]> findTop7MembersWithRank();

    default Member getById(Integer memberId) {
        return findById(memberId).orElseThrow();
    }

}
