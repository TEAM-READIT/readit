package readit.community.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.community.domain.entity.Community;

public interface CommunityRepository extends JpaRepository<Community, Integer> {
}
