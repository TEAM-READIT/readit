package readit.community.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.community.domain.entity.Participants;
import readit.community.exception.AlreadyJoinedCommunityException;
import readit.community.exception.NotJoinedCommunityException;

import java.util.Optional;

public interface ParticipantsRepository extends JpaRepository<Participants, Integer> {

    Integer deleteByMember_IdAndCommunity_Id(Integer memberId, Integer communityId);
    Optional<Participants> findByMember_IdAndCommunity_Id(Integer memberId, Integer communityId);
    Boolean existsByCommunity_Id(Integer communityId);

    default Participants getByMemberIdAndCommunityId(Integer memberId, Integer communityId) {
        return findByMember_IdAndCommunity_Id(memberId, communityId)
                .orElseThrow(NotJoinedCommunityException::new);
    }

    default void ifExistsMemberJoinCommunity(Integer memberId, Integer communityId) {
        if (findByMember_IdAndCommunity_Id(memberId, communityId).isPresent()) {
            throw new AlreadyJoinedCommunityException();
        }
    }

    default void safeLeaveCommunity(Integer memberId, Integer communityId) {
        if (deleteByMember_IdAndCommunity_Id(memberId, communityId) != 1) {
            throw new NotJoinedCommunityException();
        };
    }

}
