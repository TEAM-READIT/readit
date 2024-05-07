package readit.viewer.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import readit.article.domain.Article;
import readit.viewer.domain.entity.MemberArticle;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MemberArticleRepository extends JpaRepository<MemberArticle, Integer> {
    Optional<MemberArticle> findMemberArticleByArticleIdAndMemberId(Integer articleId, Integer memberId);
    List<MemberArticle> findMemberArticleByMemberId(Integer memberId);
    default MemberArticle getById(Integer id){
        return findById(id).orElse(null);
    }

    @Query("UPDATE MemberArticle ma SET ma.summary = :summary WHERE ma.id = :id")
    void updateSummaryById(Integer id, String summary);

    @Modifying
    @Query("UPDATE MemberArticle ma SET ma.score = :score, ma.feedback = :feedback WHERE ma.id = :id")
    void updateScoreAndFeedbackById(Integer id, Integer score, String feedback);

    int countByCommunityIdAndMemberIdAndCompletedAtBetween(
            Integer communityId, Integer memberId, LocalDateTime start, LocalDateTime end
    );

    List<MemberArticle> findByCommunityIdAndCompletedAtBetween(
            Integer communityId,
            LocalDateTime start,
            LocalDateTime end
    );
}
