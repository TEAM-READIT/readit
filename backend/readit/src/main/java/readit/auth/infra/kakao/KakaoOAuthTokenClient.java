package readit.auth.infra.kakao;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import readit.auth.domain.OAuthTokenClient;
import readit.auth.exception.TokenMissingException;
import readit.auth.infra.kakao.config.KakaoCredentials;
import readit.auth.infra.kakao.dto.KakaoTokenResponse;

@Component
@RequiredArgsConstructor
public class KakaoOAuthTokenClient implements OAuthTokenClient {
    private static final String ACCESS_TOKEN_URI = "https://kauth.kakao.com/oauth/token";
    private static final String GRANT_TYPE = "authorization_code";

    private final WebClient webClient;
    private final KakaoCredentials kakaoCredentials;

    @Override
    public Mono<String> getAccessToken(String authCode, String redirectUri) {
        MultiValueMap<String, String> body = createRequestBodyWithAuthCode(authCode, redirectUri);

        return webClient.post()
                .uri(ACCESS_TOKEN_URI)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .bodyValue(body)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(new TokenMissingException()))
                .bodyToMono(KakaoTokenResponse.class)
                .handle((kakaoTokenResponse, sink) -> {
                    if (kakaoTokenResponse == null || kakaoTokenResponse.accessToken() == null) {
                        sink.error(new TokenMissingException());
                        return;
                    }
                    sink.next(kakaoTokenResponse.accessToken());
                });
    }

    private MultiValueMap<String, String> createRequestBodyWithAuthCode(String authCode, String redirectUri) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", GRANT_TYPE);
        body.add("client_id", kakaoCredentials.getClientId());
        body.add("redirect_uri", redirectUri);
        body.add("client_secret", kakaoCredentials.getClientSecret());
        body.add("code", authCode);
        return body;
    }
}
