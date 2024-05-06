package readit.auth.infra.google;

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
public class GoogleOAuthClient implements OAuthClient {
    private final OAuthTokenClient googleOAuthTokenClient;
    private final OAuthMemberInfoClient googleOAuthMemberInfoClient;

    @Override
    public Mono<OAuthMemberResponse> request(String authCode, String redirectUri) {
        return googleOAuthTokenClient.getAccessToken(authCode, redirectUri)
                .flatMap(accessToken -> googleOAuthMemberInfoClient.getMember(accessToken));
    }

    @Override
    public MemberType getMemberType() {
        return MemberType.google;
    }
}
