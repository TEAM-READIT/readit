package readit.community.domain.dto;

import java.time.LocalDateTime;
import lombok.Builder;
import readit.article.domain.Article;
import readit.viewer.domain.entity.MemberArticle;

@Builder
public record ArticleDetail(
        String title,
        String content,
        String summary,
        Integer score,
        String feedback,
        LocalDateTime completedAt
) {
    public static ArticleDetail of(MemberArticle memberArticle) {
        return ArticleDetail.builder()
                .title(memberArticle.getArticle().getTitle())
                .content(memberArticle.getArticle().getContent())
                .summary(memberArticle.getSummary())
                .score(memberArticle.getScore())
                .feedback(memberArticle.getFeedback())
                .completedAt(memberArticle.getCompletedAt())
                .build();
    }
}
