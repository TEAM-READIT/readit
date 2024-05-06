package readit.article.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import readit.common.entity.BaseTimeEntity;
import static lombok.EqualsAndHashCode.Include;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class Article extends BaseTimeEntity {
    @Id
    @Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonIgnore
    private Category category;

    @Enumerated(EnumType.STRING)
    private ArticleType type;


    @Column(nullable = false, columnDefinition = "text")
    private String content;

    @Column(nullable = false)
    private String title;

    @Column
    private String reporter;

    @Column
    private String sourceUrl;

    @Column(nullable = false)
    private Boolean hasWord;

    @Column(columnDefinition = "text")
    private String words;

    @Column(nullable = false)
    private Integer hit;

    private void increaseHit(){
        this.hit++;
    }

}
