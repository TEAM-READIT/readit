package readit.community.domain.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import readit.community.domain.entity.Community;

public interface CommunityRepository extends JpaRepository<Community, Integer> {
    List<Community> findTop8ByOrderByHitsDesc();
    @Query("SELECT DISTINCT p.community FROM Participants p WHERE p.member.id = :memberId")
    List<Community> findAllByMemberId(@Param("memberId") Integer memberId);
}
