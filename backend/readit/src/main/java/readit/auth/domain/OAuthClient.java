package readit.auth.domain;

import readit.auth.application.dto.OAuthMemberResponse;
import readit.member.domain.MemberType;

public interface OAuthClient {
    OAuthMemberResponse request(String authCode, String redirectUri);

    MemberType getMemberType();
}
