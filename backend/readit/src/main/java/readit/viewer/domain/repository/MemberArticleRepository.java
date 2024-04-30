package readit.viewer.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import readit.viewer.domain.entity.MemberArticle;
import java.util.Optional;

public interface MemberArticleRepository extends JpaRepository<MemberArticle, Integer> {
    Optional<MemberArticle> findMemberArticleByArticleIdAndMemberId(Integer articleId, Integer memberId);

    @Query("UPDATE MemberArticle ma SET ma.summary = :summary WHERE ma.id = :id")
    void updateSummaryById(Integer id, String summary);

    @Query("UPDATE MemberArticle ma SET ma.score = :score, ma.feedback = :feedback WHERE ma.id = :id")
    void updateScoreAndFeedbackById(Integer id, Integer score, String feedback);
}
