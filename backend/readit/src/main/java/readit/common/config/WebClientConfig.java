package readit.common.config;
import io.netty.channel.ChannelOption;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.http.codec.LoggingCodecSupport;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;
import readit.common.error.WebClientSSLException;

import javax.net.ssl.SSLException;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Configuration
@Slf4j
public class WebClientConfig {

    @Bean
    public WebClient webClient(){
        ExchangeStrategies exchangeStrategies = ExchangeStrategies.builder()
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024*1024*2))
                .build();

        exchangeStrategies
                .messageWriters().stream()
                .filter(LoggingCodecSupport.class::isInstance)
                .forEach(writer -> ((LoggingCodecSupport)writer).setEnableLoggingRequestDetails(true));

        return WebClient.builder()
                .clientConnector(
                        new ReactorClientHttpConnector(
                                HttpClient.create()
                                        .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000)
                                        .responseTimeout(Duration.ofMillis(5000))
                                        .doOnConnected(conn -> conn.addHandlerLast(new ReadTimeoutHandler(5000, TimeUnit.MILLISECONDS))
                                                .addHandlerLast(new WriteTimeoutHandler(5000, TimeUnit.MILLISECONDS))
                                        )
                                        .secure(
                                                sslContextSpec -> {
                                                    try {
                                                        sslContextSpec.sslContext(
                                                                SslContextBuilder
                                                                        .forClient()
                                                                        .trustManager(InsecureTrustManagerFactory.INSTANCE)
                                                                        .build()
                                                        );
                                                    } catch (SSLException e) {
                                                        throw new WebClientSSLException();
                                                    }
                                                }
                                        )
                        )
                )
                .exchangeStrategies(exchangeStrategies)
                .filter(ExchangeFilterFunction.ofRequestProcessor(
                        clientRequest -> {
                            log.debug("Request: {} {} ", clientRequest.method(), clientRequest.url());
                            clientRequest.headers().forEach(
                                    (name, values) -> values.forEach(
                                            value -> log.debug("{} : {}", name, value))
                            );
                            return Mono.just(clientRequest);
                        }
                ))
                .filter(ExchangeFilterFunction.ofResponseProcessor(
                        clientResponse -> {
                            clientResponse.headers().asHttpHeaders().forEach(
                                    (name, values) -> values.forEach(value -> log.debug("{} : {}", name, value))
                            );
                            return Mono.just(clientResponse);
                        }
                ))
                .build();
    }
}