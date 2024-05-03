package readit.community.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.community.domain.entity.Participants;

import java.util.Optional;

public interface ParticipantsRepository extends JpaRepository<Participants, Integer> {

    Optional<Participants> findByMemberIdAndCommunityId(Integer memberId, Integer communityId);
}
