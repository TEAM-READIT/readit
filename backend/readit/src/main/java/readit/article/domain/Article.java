package readit.article.domain;

import jakarta.persistence.*;
import lombok.*;
import readit.common.entity.BaseTimeEntity;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Article extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String reporter;

    @Column(nullable = false)
    private String sourceUrl;

    @Column(nullable = false)
    private Integer hasWord;

    @Column(nullable = false)
    private String words;

    @Column(nullable = false)
    private Integer hits;
}
