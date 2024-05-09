package readit.challenge.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import readit.article.domain.Article;
import readit.common.entity.BaseTimeEntity;
import readit.member.domain.Member;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

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
    private LocalDate solvedAt;

    @Column(nullable = false)
    private Integer submitNumber;

    @Column(nullable = false)
    private Boolean isCorrect;

    @Column(nullable = false)
    private Integer score;

    public void saveDayScore(Integer challengeScore) {
        this.score = challengeScore;
    }

}
