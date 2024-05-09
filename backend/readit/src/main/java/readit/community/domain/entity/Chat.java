package readit.community.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import readit.common.entity.BaseTimeEntity;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    @JsonIgnore
    private Participants participant;

    @Column(length = 200)
    private String content;

    public static Chat create(Community community, Participants participant, String content) {
        return Chat.builder()
                .community(community)
                .participant(participant)
                .content(content)
                .build();
    }
}
