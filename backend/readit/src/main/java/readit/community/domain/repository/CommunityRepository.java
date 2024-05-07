package readit.community.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import readit.community.domain.entity.Community;
import readit.viewer.exception.ValueMissingException;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Integer> {
    List<Community> findTop8ByOrderByHitsDesc();

    @Query("SELECT DISTINCT p.community FROM Participants p WHERE p.member.id = :memberId")
    List<Community> findAllByMemberId(@Param("memberId") Integer memberId);

    @Modifying
    @Query("UPDATE Community c SET c.hits = c.hits + 1 WHERE c.id = :communityId")
    void increaseHitsById(@Param("communityId") Integer communityId);

    @Query("SELECT COUNT(p) FROM Participants p WHERE p.community.id = :communityId")
    int countParticipantsByCommunityId(@Param("communityId") Integer communityId);

    // default method 란?
    default Community getById(Integer id) {
        return findById(id)
                .orElseThrow(ValueMissingException::new);
    }
}
