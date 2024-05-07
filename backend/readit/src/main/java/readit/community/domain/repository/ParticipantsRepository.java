package readit.community.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.community.domain.entity.Participants;
import readit.community.exception.AlreadyJoinedCommunityException;

import java.util.Optional;

public interface ParticipantsRepository extends JpaRepository<Participants, Integer> {

    Optional<Participants> findByMemberIdAndCommunityId(Integer memberId, Integer communityId);
    int deleteByMemberIdAndCommunityId(Integer memberId, Integer communityId);

    default void getByMemberIdAndCommunityId(Integer memberId, Integer communityId) {
        if (findByMemberIdAndCommunityId(memberId, communityId).isPresent()) {
            throw new AlreadyJoinedCommunityException();
        }
    }
}
