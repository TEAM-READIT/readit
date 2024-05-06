package readit.auth.infra.kakao;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import readit.auth.application.dto.OAuthMemberResponse;
import readit.auth.domain.OAuthMemberInfoClient;
import readit.auth.infra.kakao.dto.KakaoMemberResponse;
import readit.member.exception.MemberNotFoundException;

@Component
@RequiredArgsConstructor
public class KakaoOAuthMemberInfoClient implements OAuthMemberInfoClient {
    private static final String USER_INFO_URI = "https://kapi.kakao.com/v2/user/me";
    private final WebClient webClient;

    @Override
    public Mono<OAuthMemberResponse> getMember(String accessToken) {
        return webClient.get()
                .uri(USER_INFO_URI)
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .onStatus(httpStatusCode -> httpStatusCode.is4xxClientError(), clientResponse -> Mono.error(new MemberNotFoundException()))
                .bodyToMono(KakaoMemberResponse.class)
                .switchIfEmpty(Mono.error(new MemberNotFoundException()))
                .handle((kakaoMemberResponse, sink) -> {
                    if (kakaoMemberResponse == null) {
                        sink.error(new MemberNotFoundException());
                        return;
                    }
                    sink.next(kakaoMemberResponse);
                });
    }
}
