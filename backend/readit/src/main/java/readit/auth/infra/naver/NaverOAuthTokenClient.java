package readit.auth.infra.naver;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import readit.auth.domain.OAuthTokenClient;
import readit.auth.exception.TokenMissingException;
import readit.auth.infra.naver.config.NaverCredentials;
import readit.auth.infra.naver.dto.NaverTokenResponse;

import static java.util.Objects.requireNonNull;
import static org.springframework.http.HttpMethod.POST;

@Component
@RequiredArgsConstructor
public class NaverOAuthTokenClient implements OAuthTokenClient {

    private static final String ACCESS_TOKEN_URI = "https://nid.naver.com/oauth2.0/token";
    private static final String GRANT_TYPE = "authorization_code";
    private final RestTemplate restTemplate;
    private static final String State = "readit123";
    private final NaverCredentials naverCredentials;

    @Override
    public String getAccessToken(String authCode, String redirectUri) {
        MultiValueMap<String, String> params = createRequestBodyWithAuthcode(authCode, redirectUri);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<NaverTokenResponse> naverTokenResponseResponse = getNaverToken(request);
        return requireNonNull(requireNonNull(naverTokenResponseResponse.getBody())).accessToken();
    }

    private MultiValueMap<String, String> createRequestBodyWithAuthcode(String authCode, String redirectUri) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", GRANT_TYPE);
        params.add("client_id", naverCredentials.getClientId());
        params.add("client_secret", naverCredentials.getClientSecret());
        params.add("code", authCode);
        params.add("state", State);
        return params;
    }

    private ResponseEntity<NaverTokenResponse> getNaverToken(HttpEntity<MultiValueMap<String, String>> request) {
        try {
            return restTemplate.exchange(
                    ACCESS_TOKEN_URI,
                    POST,
                    request,
                    NaverTokenResponse.class
            );
        } catch (HttpClientErrorException e) {
            throw new TokenMissingException();
        }
    }
}
