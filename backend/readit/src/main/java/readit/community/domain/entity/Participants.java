package readit.community.domain.entity;

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
public class Participants extends BaseTimeEntity {
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id", referencedColumnName = "id")
    private Community community;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;

    public static Participants create(Community community, Member member) {
        return Participants.builder()
                .community(community)
                .member(member)
                .build();
    }
}
