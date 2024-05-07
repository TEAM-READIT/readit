package readit.challenge.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.challenge.exception.MemberQuestionNotFoundException;
import readit.challenge.domain.MemberQuestion;
import readit.member.domain.Member;

import java.util.Optional;

public interface MemberQuestionRepository extends JpaRepository<MemberQuestion,Integer> {
    Optional<MemberQuestion> findByMember(Member member);

    default MemberQuestion getByMember(Member member){
        return findByMember(member)
                .orElseThrow(MemberQuestionNotFoundException::new);
    }
}
