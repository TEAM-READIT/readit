package readit.viewer.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import readit.viewer.domain.entity.MemberArticle;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import readit.viewer.exception.ValueMissingException;

public interface MemberArticleRepository extends JpaRepository<MemberArticle, Integer> {
    Optional<MemberArticle> findMemberArticleByArticleIdAndMemberId(Integer articleId, Integer memberId);

    @Query("SELECT ma FROM MemberArticle ma WHERE ma.memberId = :memberId AND ma.completedAt IS NOT NULL ORDER BY ma.completedAt DESC LIMIT 3")
    List<MemberArticle> findCompleteArticle(Integer memberId);

    @Query("SELECT ma FROM MemberArticle ma WHERE ma.memberId = :memberId AND ma.completedAt IS NULL ORDER BY ma.createdAt DESC LIMIT 3")
    List<MemberArticle> findTempArticle(Integer memberId);
    default MemberArticle getById(Integer memberId, Integer id){
        return findMemberArticleByArticleIdAndMemberId(id,memberId).orElse(null);
    }

    @Modifying
    @Query("UPDATE MemberArticle ma SET ma.score = :score, ma.feedback = :feedback WHERE ma.id = :id")
    void updateScoreAndFeedbackById(Integer id, Integer score, String feedback);

    @Query("SELECT count(ma) FROM MemberArticle ma " +
            "WHERE ma.communityId = :communityId AND ma.memberId = :memberId AND ma.completedAt BETWEEN :start AND :end")
    int countMyArticleThisWeek(
            Integer communityId, Integer memberId, LocalDateTime start, LocalDateTime end
    );

    @Query("SELECT ma FROM MemberArticle ma WHERE ma.communityId = :communityId AND ma.completedAt BETWEEN :start AND :end")
    List<MemberArticle> findByCommunityIdInThisWeek(
            Integer communityId, LocalDateTime start, LocalDateTime end
    );

    default MemberArticle getByArticleIdAndMemberId(Integer articleId, Integer memberId) {
        return findMemberArticleByArticleIdAndMemberId(articleId, memberId)
                .orElseThrow(ValueMissingException::new);
    };
}
