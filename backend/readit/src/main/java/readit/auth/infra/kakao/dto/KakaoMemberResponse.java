package readit.auth.infra.kakao.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import readit.auth.application.dto.OAuthMemberResponse;
import readit.member.domain.Member;
import readit.member.domain.MemberType;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoMemberResponse implements OAuthMemberResponse {

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class KakaoAccount{
        private Profile profile;
        private String email;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Profile {

        @JsonProperty("thumbnail_image_url")
        private String picture;
        private String nickname;
    }

    @Override
    public String getEmail() {
        return kakaoAccount.getEmail();
    }

    @Override
    public String getNickName() {
        return kakaoAccount.getProfile().getNickname();
    }

    @Override
    public String getPicture() {
        return kakaoAccount.getProfile().getPicture();
    }

    @Override
    public Member toMember() {
        return Member.builder().name(getNickName()).email(getEmail()).profile(getPicture()).memberType(getMemberType()).challengeScore(1000)
                .build();
    }

    @Override
    public MemberType getMemberType() {
        return MemberType.kakao;
    }

}
