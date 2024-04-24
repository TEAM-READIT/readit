package readit.auth.infra.kakao;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import readit.auth.application.dto.OAuthMemberResponse;
import readit.auth.domain.OAuthMemberInfoClient;
import readit.auth.infra.kakao.dto.KakaoMemberResponse;
import readit.member.exception.MemberNotFoundException;

import static org.springframework.http.HttpMethod.GET;

@Component
@RequiredArgsConstructor
public class KakaoOAuthMemberInfoClient implements OAuthMemberInfoClient {
    private static final String USER_INFO_URI = "https://kapi.kakao.com/v2/user/me";

    private final RestTemplate restTemplate;

    @Override
    public OAuthMemberResponse getMember(String accessToken) {
        HttpEntity<HttpHeaders> request = createRequest(accessToken);
        ResponseEntity<KakaoMemberResponse> response = getKakaoMember(request);
        return response.getBody();
    }

    private HttpEntity<HttpHeaders> createRequest(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        return new HttpEntity<>(headers);
    }

    private ResponseEntity<KakaoMemberResponse> getKakaoMember(HttpEntity<HttpHeaders> request) {
        try {
            return restTemplate.exchange(
                    USER_INFO_URI,
                    GET,
                    request,
                    KakaoMemberResponse.class
            );
        } catch (HttpClientErrorException e) {
            throw new MemberNotFoundException();
        }
    }
}
