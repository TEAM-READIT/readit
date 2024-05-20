package readit.member.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import readit.member.domain.Member;
import readit.member.domain.MemberType;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByEmailAndMemberType(String email, MemberType memberType);

    List<Member> findTop7ByOrderByChallengeScoreDesc();
    @Query("SELECT COUNT(*) FROM Member m WHERE m.challengeScore > :score")
    Optional<Integer> countPlayersWithHigherScore(int score);

    default Member getById(Integer memberId) {
        return findById(memberId).orElseThrow();
    }

}
