package readit.viewer.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import readit.article.domain.Article;
import readit.common.entity.BaseTimeEntity;
import readit.viewer.domain.dto.request.PostTempSaveRequest;
import readit.viewer.exception.DataTooLongException;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@CacheConfig(cacheNames = "article")
public class MemberArticle extends BaseTimeEntity {
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer memberId;

    private Integer communityId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "article_id", referencedColumnName = "id")
    @JsonIgnore
    private Article article;

    @Column(length = 500)
    private String summary;

    private Integer score;

    @Column(length = 500)
    private String feedback;

    private LocalDateTime completedAt;

    @Column(columnDefinition = "mediumtext")
    private String content;

    public static MemberArticle create(Article article, Integer memberId, PostTempSaveRequest request) {
        return MemberArticle.builder()
                .memberId(memberId)
                .article(article)
                .summary(request.summary())
                .content(request.content())
                .communityId(request.communityId())
                .build();
    }

    public void updateForSaveTemp(PostTempSaveRequest request) {
        if (summary.length() < 500) {
            this.summary = request.summary();
            this.content = request.content();
            this.communityId = request.communityId();
        } else {
            throw new DataTooLongException();
        }
    }

    @CacheEvict(key = "'stats'")
    public void updateWhenComplete(LocalDateTime completedAt, Integer score, String feedback) {
        this.completedAt =  completedAt;
        this.score = score;
        this.feedback = feedback;
    }
}
