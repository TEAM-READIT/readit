package readit.article.util;

import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

@Slf4j
@Component
@RequiredArgsConstructor
public class ArticleScheduler {
    private final WebClient webClient;

    @Scheduled(cron = "0 0 0 * * ?")
    public void scheduleStartCrawler() {
        startCrawler().subscribe(
                result -> log.info("크롤러가 정상 호출 되었습니다."),
                error -> log.error("크롤러 호출 중 에러가 발생하였습니다.", error),
                () -> log.info("크롤러 작동이 완료되었습니다.")
        );
    }

    public Mono<Void> startCrawler() {
        WebClient customWebClient = this.webClient.mutate()
                .clientConnector(new ReactorClientHttpConnector(
                        HttpClient.create()
                                .responseTimeout(Duration.ofSeconds(Long.MAX_VALUE))
                                .doOnConnected(connection ->
                                        connection.removeHandler(ReadTimeoutHandler.class.getName())
                                                .removeHandler(WriteTimeoutHandler.class.getName())
                                )
                ))
                .build();

        return customWebClient.post()
                .uri("http://127.0.0.1:8888/start/crawler")
                .retrieve()
                .toBodilessEntity()
                .then();
    }
}
