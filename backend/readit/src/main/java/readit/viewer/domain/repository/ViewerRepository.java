package readit.viewer.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.viewer.domain.dto.Viewer;

public interface ViewerRepository extends JpaRepository<Viewer, Integer> {
}
