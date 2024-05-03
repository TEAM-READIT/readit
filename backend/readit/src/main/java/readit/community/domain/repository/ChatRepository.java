package readit.community.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.community.domain.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
}
