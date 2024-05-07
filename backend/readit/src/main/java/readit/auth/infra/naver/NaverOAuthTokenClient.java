package readit.auth.infra.naver;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import readit.auth.domain.OAuthTokenClient;
import readit.auth.exception.TokenMissingException;
import readit.auth.infra.naver.config.NaverCredentials;
import readit.auth.infra.naver.dto.NaverTokenResponse;

@Component
@RequiredArgsConstructor
public class NaverOAuthTokenClient implements OAuthTokenClient {

    private static final String ACCESS_TOKEN_URI = "https://nid.naver.com/oauth2.0/token";
    private static final String GRANT_TYPE = "authorization_code";
    private static final String STATE = "readit123";
    private final WebClient webClient;
    private final NaverCredentials naverCredentials;

    @Override
    public Mono<String> getAccessToken(String authCode, String redirectUri) {
        MultiValueMap<String, String> params = createRequestBodyWithAuthcode(authCode, redirectUri);

        return webClient.post()
                .uri(ACCESS_TOKEN_URI)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .bodyValue(params)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(new TokenMissingException()))
                .bodyToMono(NaverTokenResponse.class)
                .handle((naverTokenResponse, sink) -> {
                    if (naverTokenResponse == null || naverTokenResponse.accessToken() == null) {
                        sink.error(new TokenMissingException());
                        return;
                    }
                    sink.next(naverTokenResponse.accessToken());
                });
    }

    private MultiValueMap<String, String> createRequestBodyWithAuthcode(String authCode, String redirectUri) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", GRANT_TYPE);
        params.add("client_id", naverCredentials.getClientId());
        params.add("client_secret", naverCredentials.getClientSecret());
        params.add("code", authCode);
        params.add("state", STATE);
        params.add("redirect_uri", naverCredentials.getRedirectUri());
        return params;
    }
}
