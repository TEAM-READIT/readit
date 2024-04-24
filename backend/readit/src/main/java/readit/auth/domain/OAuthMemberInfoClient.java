package readit.auth.domain;

import readit.auth.application.dto.OAuthMemberResponse;

public interface OAuthMemberInfoClient {
    OAuthMemberResponse getMember(String accessToken);
}
