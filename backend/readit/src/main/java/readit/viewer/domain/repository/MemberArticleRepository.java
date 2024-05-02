package readit.viewer.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import readit.viewer.domain.entity.MemberArticle;

import java.util.List;
import java.util.Optional;

public interface MemberArticleRepository extends JpaRepository<MemberArticle, Integer> {
    Optional<MemberArticle> findMemberArticleByArticleIdAndMemberId(Integer articleId, Integer memberId);
    List<MemberArticle> findMemberArticleByMemberId(Integer memberId);

    @Query("UPDATE MemberArticle ma SET ma.summary = :summary WHERE ma.id = :Id")
    void updateSummaryById(Integer Id, String summary);
}
