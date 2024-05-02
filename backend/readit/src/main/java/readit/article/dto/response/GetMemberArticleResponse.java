package readit.article.dto.response;

import readit.viewer.domain.entity.MemberArticle;

import java.time.LocalDateTime;
import java.util.List;

public record GetMemberArticleResponse(
    Integer id,
    String title,
    String content,
    String type,
    String categoryName,
    String reporter,
    Integer hit,
    Integer score,
    String summary,
    LocalDateTime completedAt
) {
    public static GetMemberArticleResponse from(MemberArticle memberArticle){
        return new GetMemberArticleResponse(
                memberArticle.getId(),
                memberArticle.getArticle().getTitle(),
                memberArticle.getArticle().getContent(),
                memberArticle.getType().toString(),
                memberArticle.getArticle().getCategory().getName(),
                memberArticle.getArticle().getReporter(),
                memberArticle.getArticle().getHit(),
                memberArticle.getScore(),
                memberArticle.getSummary(),
                memberArticle.getCompletedAt()
        );
    }
}
