package readit.auth.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readit.auth.domain.RefreshToken;
import readit.auth.exception.RefreshTokenNotFoundException;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    default RefreshToken getByToken(String token) {
        return findByToken(token).orElseThrow(RefreshTokenNotFoundException::new);
    }

    void deleteByMemberId(Long memberId);
}
