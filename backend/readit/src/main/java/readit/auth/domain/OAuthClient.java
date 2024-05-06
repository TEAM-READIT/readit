package readit.auth.domain;

import reactor.core.publisher.Mono;
import readit.auth.application.dto.OAuthMemberResponse;
import readit.member.domain.MemberType;

public interface OAuthClient {
    Mono<OAuthMemberResponse> request(String authCode, String redirectUri);
    MemberType getMemberType();
}
