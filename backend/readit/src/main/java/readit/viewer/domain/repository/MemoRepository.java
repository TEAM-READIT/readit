package readit.viewer.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.viewer.domain.entity.Memo;

public interface MemoRepository extends JpaRepository<Memo, Integer> {
}
