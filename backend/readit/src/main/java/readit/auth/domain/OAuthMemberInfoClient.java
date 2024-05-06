package readit.auth.domain;

import reactor.core.publisher.Mono;
import readit.auth.application.dto.OAuthMemberResponse;

public interface OAuthMemberInfoClient {
    Mono<OAuthMemberResponse> getMember(String accessToken);
}
