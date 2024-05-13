package readit.community.domain.dto;

import java.time.LocalDateTime;
import readit.viewer.domain.entity.MemberArticle;

public record ArticleDetail(
        String title,
        String content,
        String summary,
        Integer score,
        String feedback,
        LocalDateTime completedAt
) {
    public static ArticleDetail from(MemberArticle memberArticle) {

        return new ArticleDetail(
                memberArticle.getArticle().getTitle(),
                memberArticle.getArticle().getContent(),
                memberArticle.getSummary(),
                memberArticle.getScore(),
                memberArticle.getFeedback(),
                memberArticle.getCompletedAt()
        );
    }
}
