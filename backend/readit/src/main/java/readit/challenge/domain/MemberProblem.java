package readit.challenge.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import readit.article.domain.Article;
import readit.common.entity.BaseTimeEntity;
import readit.member.domain.Member;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class MemberProblem extends BaseTimeEntity {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "article_id", referencedColumnName = "id")
    private Article article;

    @Column(nullable = false)
    private LocalDateTime solvedAt;

    @Column(nullable = false)
    private Integer submitNumber;

    @Column(nullable = false)
    private Boolean isCorrect;

    @Column(nullable = false)
    @ColumnDefault("1000")
    private Integer score;

    public void saveDayScore(Integer challengeScore) {
        this.score = challengeScore;
    }
}
