package readit.auth.infra.google;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import readit.auth.domain.OAuthTokenClient;
import readit.auth.exception.TokenMissingException;
import readit.auth.infra.google.config.GoogleCredentials;
import readit.auth.infra.google.dto.GoogleTokenResponse;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class GoogleOAuthTokenClient implements OAuthTokenClient {
    private static final String ACCESS_TOKEN_URI = "https://www.googleapis.com/oauth2/v4/token";
    private static final String GRANT_TYPE = "authorization_code";
    private final WebClient webClient;
    private final GoogleCredentials googleCredentials;

    @Override
    public Mono<String> getAccessToken(String authCode, String redirectUri) {
        String decode = URLDecoder.decode(authCode, StandardCharsets.UTF_8);
        MultiValueMap<String, String> body = createRequestBodyWithAuthCode(decode, redirectUri);

        return webClient.post()
                .uri(ACCESS_TOKEN_URI)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .bodyValue(body)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(new TokenMissingException()))
                .bodyToMono(GoogleTokenResponse.class)
                .handle((googleTokenResponse, sink) -> {
                    if (googleTokenResponse == null || googleTokenResponse.accessToken() == null) {
                        sink.error(new TokenMissingException());
                        return;
                    }
                    sink.next(googleTokenResponse.accessToken());
                });
    }

    private MultiValueMap<String, String> createRequestBodyWithAuthCode(String authCode, String redirectUri) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", googleCredentials.getClientId());
        body.add("client_secret", googleCredentials.getClientSecret());
        body.add("code", authCode);
        body.add("grant_type", GRANT_TYPE);
        body.add("redirect_uri", googleCredentials.getRedirectUri());
        return body;
    }
}