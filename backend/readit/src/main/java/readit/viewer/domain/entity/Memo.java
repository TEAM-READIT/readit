package readit.viewer.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class Memo {
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_article_id", referencedColumnName = "id")
    private MemberArticle memberArticle;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false, length = 200)
    private String content;

    @Column(nullable = false)
    private Integer startIndex;

    @Column(nullable = false)
    private Integer endIndex;

    public void includeMemberArticle(MemberArticle memberArticle) {
        this.memberArticle = memberArticle;;
    }
}
