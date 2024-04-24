package readit.member.domain;

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
public class Member extends BaseTimeEntity {
    @Id
    @Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String profile;

    @Enumerated(EnumType.STRING)
    private MemberType memberType;

    @Column(nullable = false)
    private Integer challengeScore = 1000;
}
