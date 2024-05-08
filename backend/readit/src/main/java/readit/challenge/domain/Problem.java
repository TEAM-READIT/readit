package readit.challenge.domain;

import jakarta.persistence.*;
import lombok.*;
import readit.article.domain.Article;
import readit.common.entity.BaseTimeEntity;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class Problem extends BaseTimeEntity {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "article_id", referencedColumnName = "id")
    private Article article;

    @Column(nullable = false)
    private Integer problemNumber;

    @Column(nullable = false, length = 1000)
    private String problem;

    @Column(nullable = false)
    private Integer answer;

}
