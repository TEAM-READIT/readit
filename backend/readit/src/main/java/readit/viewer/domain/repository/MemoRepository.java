package readit.viewer.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.viewer.domain.entity.Memo;

import java.util.List;

public interface MemoRepository extends JpaRepository<Memo, Integer> {
    List<Memo> findByMemberArticleId(Integer memberArticleId);
}
