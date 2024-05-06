package readit.auth.infra.naver;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import readit.auth.application.dto.OAuthMemberResponse;
import readit.auth.domain.OAuthMemberInfoClient;
import readit.auth.infra.naver.dto.NaverMemberResponse;
import readit.member.exception.MemberNotFoundException;

@Component
@RequiredArgsConstructor
public class NaverOAuthMemberInfoClient implements OAuthMemberInfoClient {
    private static final String USER_INFO_URI = "https://openapi.naver.com/v1/nid/me";
    private final WebClient webClient;

    @Override
    public Mono<OAuthMemberResponse> getMember(String accessToken) {
        return webClient.get()
                .uri(USER_INFO_URI)
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .onStatus(httpStatus -> httpStatus.is4xxClientError(), clientResponse -> Mono.error(new MemberNotFoundException()))
                .bodyToMono(NaverMemberResponse.class)
                .handle((naverMemberResponse, sink) -> {
                    if (naverMemberResponse == null) {
                        sink.error(new MemberNotFoundException());
                        return;
                    }
                    sink.next(NaverMemberResponse.builder()
                            .naverAcount(naverMemberResponse.getNaverAcount())
                            .build());
                });
    }
}
