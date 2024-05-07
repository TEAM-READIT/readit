package readit.auth.infra.naver;

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
public class NaverOAuthClient implements OAuthClient {
    private final OAuthTokenClient naverOAuthTokenClient;
    private final OAuthMemberInfoClient naverOAuthMemberInfoClient;

    @Override
    public Mono<OAuthMemberResponse> request(String authCode, String redirectUri) {
        return naverOAuthTokenClient.getAccessToken(authCode, redirectUri)
                .flatMap(naverOAuthMemberInfoClient::getMember);
    }

    @Override
    public MemberType getMemberType() {
        return MemberType.naver;
    }
}
