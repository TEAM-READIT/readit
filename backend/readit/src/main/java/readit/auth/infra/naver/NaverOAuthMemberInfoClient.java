package readit.auth.infra.naver;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import readit.auth.application.dto.OAuthMemberResponse;
import readit.auth.domain.OAuthMemberInfoClient;
import readit.auth.infra.naver.dto.NaverMemberResponse;
import readit.member.exception.MemberNotFoundException;

import static org.springframework.http.HttpMethod.GET;

@Component
@RequiredArgsConstructor
public class NaverOAuthMemberInfoClient implements OAuthMemberInfoClient {
    private static final String USER_INFO_URI = "https://openapi.naver.com/v1/nid/me";
    private final RestTemplate restTemplate;

    @Override
    public OAuthMemberResponse getMember(String accessToken) {
        HttpEntity<HttpHeaders> request = createRequest(accessToken);
        ResponseEntity<NaverMemberResponse> response = getNaverMember(request);
        return response.getBody();
    }

    private HttpEntity<HttpHeaders> createRequest(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        return new HttpEntity<>(headers);
    }

    private ResponseEntity<NaverMemberResponse> getNaverMember(HttpEntity<HttpHeaders> request) {
        try {
            return restTemplate.exchange(
                    USER_INFO_URI,
                    GET,
                    request,
                    NaverMemberResponse.class
            );
        } catch (HttpClientErrorException e) {
            throw new MemberNotFoundException();
        }
    }
}