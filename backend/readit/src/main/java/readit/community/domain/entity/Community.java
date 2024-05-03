package readit.community.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import readit.article.domain.Category;
import readit.common.entity.BaseTimeEntity;
import readit.member.domain.Member;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class Community extends BaseTimeEntity {
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @Column(nullable = false)
    private Integer writerId;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer maxParticipants;

    @Column(nullable = false)
    private LocalDate startAt;

    @Column(nullable = false)
    private LocalDate endAt;

    @Column(length = 100)
    private String notice;

    @Column(nullable = false)
    private Integer articleCount;

    @OneToMany(mappedBy = "community")
    private List<Participants> participants = new ArrayList<>();

    public Participants joinParticipant(Member member) {
        // Participants 엔티티 생성
        Participants participant = Participants.builder()
                .community(this) // 현재 Community를 Participants에 설정
                .member(member) // 참가할 Member를 Participants에 설정
                .build();

        // Participants를 community의 participants 목록에 추가
        participants.add(participant);

        return participant;
    }
}
