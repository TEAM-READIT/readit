package readit.auth.infra.google;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import readit.auth.application.dto.OAuthMemberResponse;
import readit.auth.domain.OAuthMemberInfoClient;
import readit.auth.infra.google.dto.GoogleMemberResponse;
import readit.member.exception.MemberNotFoundException;

@Component
@RequiredArgsConstructor
public class GoogleOAuthMemberInfoClient implements OAuthMemberInfoClient {
    private static final String USER_INFO_URI = "https://www.googleapis.com/userinfo/v2/me";
    private final WebClient webClient;

    @Override
    public Mono<OAuthMemberResponse> getMember(String accessToken) {
        return webClient.get()
                .uri(USER_INFO_URI)
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(new MemberNotFoundException()))
                .bodyToMono(GoogleMemberResponse.class)
                .handle((googleMemberResponse, sink) -> {
                    if (googleMemberResponse == null) {
                        sink.error(new MemberNotFoundException());
                        return;
                    }
                    sink.next(googleMemberResponse);
                });
    }
}
