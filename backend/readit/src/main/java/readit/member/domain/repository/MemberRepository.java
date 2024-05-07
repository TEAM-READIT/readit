package readit.member.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.member.domain.Member;
import readit.member.domain.MemberType;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByEmailAndMemberType(String email, MemberType memberType);

    default Member getById(Integer memberId) {
        return findById(memberId).orElseThrow();
    }
}