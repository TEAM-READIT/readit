package readit.auth.infra.google;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
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
    public OAuthMemberResponse request(String authCode, String redirectUri) {
        String accessToken = googleOAuthTokenClient.getAccessToken(authCode, redirectUri);
        return googleOAuthMemberInfoClient.getMember(accessToken);
    }

    @Override
    public MemberType getMemberType() {
        return MemberType.google;
    }
}
