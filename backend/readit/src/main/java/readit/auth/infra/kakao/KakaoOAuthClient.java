package readit.auth.infra.kakao;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import readit.auth.application.dto.OAuthMemberResponse;
import readit.auth.domain.OAuthClient;
import readit.auth.domain.OAuthMemberInfoClient;
import readit.auth.domain.OAuthTokenClient;
import readit.member.domain.MemberType;

@Component
@RequiredArgsConstructor
public class KakaoOAuthClient implements OAuthClient {

    private final OAuthTokenClient kakaoOAuthTokenClient;
    private final OAuthMemberInfoClient kakaoOAuthMemberInfoClient;

    @Override
    public Mono<OAuthMemberResponse> request(String authCode, String redirectUri) {
        return kakaoOAuthTokenClient.getAccessToken(authCode, redirectUri)
                .flatMap(kakaoOAuthMemberInfoClient::getMember);
    }

    @Override
    public MemberType getMemberType() {
        return MemberType.kakao;
    }
}
