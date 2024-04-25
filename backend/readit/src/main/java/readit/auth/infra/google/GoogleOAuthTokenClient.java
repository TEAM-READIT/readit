package readit.auth.infra.google;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import readit.auth.domain.OAuthTokenClient;
import readit.auth.exception.TokenMissingException;
import readit.auth.infra.google.config.GoogleCredentials;
import readit.auth.infra.google.dto.GoogleTokenResponse;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import static java.util.Objects.requireNonNull;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED;

@Component
@RequiredArgsConstructor
public class GoogleOAuthTokenClient implements OAuthTokenClient {
    private static final String ACCESS_TOKEN_URI = "https://www.googleapis.com/oauth2/v4/token";
    private static final String GRANT_TYPE = "authorization_code";
    private final RestTemplate restTemplate;
    private final GoogleCredentials googleCredentials;
    @Override
    public String getAccessToken(String authCode, String redirectUri) {
        HttpHeaders headers = creatRequestHeader();
        String decode = URLDecoder.decode(authCode, StandardCharsets.UTF_8);
        MultiValueMap<String, String> body = createRequestBodyWithAuthCode(decode, redirectUri);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<GoogleTokenResponse> googleTokenResponse = getGoogleToken(request);
        return requireNonNull(requireNonNull(googleTokenResponse.getBody())).accessToken();
    }

    private HttpHeaders creatRequestHeader(){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(APPLICATION_FORM_URLENCODED);
        return headers;
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

    private ResponseEntity<GoogleTokenResponse> getGoogleToken(HttpEntity<MultiValueMap<String, String>> request) {
        try {
            return restTemplate.exchange(
                    ACCESS_TOKEN_URI,
                    POST,
                    request,
                    GoogleTokenResponse.class
            );
        } catch (HttpClientErrorException e) {
            throw new TokenMissingException();
        }

    }
}
