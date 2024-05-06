package readit.auth.domain;

import reactor.core.publisher.Mono;

public interface OAuthTokenClient {
    Mono<String> getAccessToken(String authCode, String redirectUri);
}
