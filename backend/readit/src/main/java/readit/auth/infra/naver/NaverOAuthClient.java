package readit.auth.infra.naver;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
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
    public OAuthMemberResponse request(String authCode, String redirectUri) {
        String accessToken = naverOAuthTokenClient.getAccessToken(authCode, redirectUri);
        return naverOAuthMemberInfoClient.getMember(accessToken);
    }

    @Override
    public MemberType getMemberType() {
        return MemberType.naver;
    }

}
