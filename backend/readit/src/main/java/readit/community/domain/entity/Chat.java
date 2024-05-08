package readit.community.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import readit.common.entity.BaseTimeEntity;
import readit.member.domain.Member;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class Chat extends BaseTimeEntity {
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "community_id", referencedColumnName = "id")
    @JsonIgnore
    private Community community;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id", referencedColumnName = "id", unique = false,
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private Member member;

    @Column(length = 200)
    private String content;

    public static Chat create(Community community, Member member, String content) {
        return Chat.builder()
                .community(community)
                .member(member)
                .content(content)
                .build();
    }
}
