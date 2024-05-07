package readit.community.domain.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Category category;

    @Column(nullable = false)
    private Integer writerId;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer maxParticipants;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @Column(nullable = false)
    private LocalDate startAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @Column(nullable = false)
    private LocalDate endAt;

    @Column(length = 100)
    private String notice;

    @Column(nullable = false)
    private Integer articleCount;

    @OneToMany(mappedBy = "community")
    private List<Participants> participants = new ArrayList<>();

    @Column(nullable = false)
    private Integer hits;

    public Participants joinParticipant(Member member) {
        Participants participant = Participants.builder()
                .community(this)
                .member(member)
                .build();
        participants.add(participant);
        return participant;
    }
}
