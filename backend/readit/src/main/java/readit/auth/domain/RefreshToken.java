package readit.auth.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import readit.common.entity.BaseTimeEntity;


import static lombok.EqualsAndHashCode.Include;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class RefreshToken extends BaseTimeEntity {
    @Id
    @Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer memberId;
    private String token;

    public RefreshToken(Integer memberId, String token) {
        this.memberId = memberId;
        this.token = token;
    }
}
