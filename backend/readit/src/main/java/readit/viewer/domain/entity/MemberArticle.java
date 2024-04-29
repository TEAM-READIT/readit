package readit.viewer.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import readit.article.domain.Article;
import readit.article.domain.ArticleType;
import readit.common.entity.BaseTimeEntity;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class MemberArticle extends BaseTimeEntity {
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer memberId;

    private Integer communityId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", referencedColumnName = "id")
    private Article article;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ArticleType type;

    @Column(length = 500)
    private String summary;

    private Integer score;

    @Column(length = 500)
    private String feedback;

    private LocalDateTime completedAt;

    public static MemberArticle create(Article article, Integer memberId, String summary) {
        return MemberArticle.builder()
                .memberId(memberId)
                .article(article)
                .type(article.getType())
                .summary(summary)
                .build();
    }
}
