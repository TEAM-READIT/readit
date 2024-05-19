# [BE] RestTemplate -> Webclient 리팩토링 하기

## RestTemplate에서 WebClient로 바꿔야하는 이유
`RestTemplate 은 Deprecated 될 것이다.` 스프링 프레임워크에서 제공하는 RestTemplate 클래스를 살펴보면 아래와 같은 코멘트를 확인할 수 있습니다. 
> NOTE: As of 5.0 this class is in maintenance mode, with only minor requests for changes and bugs to be accepted going forward. Please, consider using the org.springframework.web.reactive.client.WebClient which has a more modern API and supports sync, async, and streaming scenarios.

간단히 요약하면 RestTemplate 보다는 더 현대적인 WebClient를 사용하라는 뜻입니다. 이러한 스프링 공식 문서를 확인 후 전체적인 RestTemplate과 WebClient의 성능을 비교해보았고, 저희 서비스에서 왜 WebClient가 필요한지 타당성을 검증하고 리팩토링 하기로 결정하였습니다.

## RestTemplate 설명
![RestTemplate](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fn19Ew%2FbtqXXiRbZHn%2FRBH1K5HKzwvkFZGp7Kom1k%2Fimg.png)
`RestTemplate은 Multi-Thread와 Blocking방식을 사용`합니다.
Thread pool은 요청자 어플리케이션 구동시에 미리 만들어 놓습니다.
Request는 먼저 Queue에 쌓이고 가용한 스레드가 있으면 그 스레드에 할당되어 처리됩니다.
즉, 1 요청 당 1 스레드가 할당됩니다.
각 스레드에서는 Blocking방식으로 처리되어 응답이 올때까지 그 스레드는 다른 요청에 할당될 수 없습니다.

## WebClient 설명
![WebClient](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbmXoLk%2FbtqXXVBywK0%2F9jWK84VgwC4NqNWnTkY9H0%2Fimg.jpg)
`Spring WebClient는 Single Thread와 Non-Blocking방식`을 사용합니다. Core 당 1개의 Thread를 이용합니다.
각 요청은 Event Loop내에 Job으로 등록이 됩니다.
Event Loop는 각 Job을 제공자에게 요청한 후, 결과를 기다리지 않고 다른 Job을 처리합니다.
Event Loop는 제공자로부터 callback으로 응답이 오면, 그 결과를 요청자에게 제공합니다.
WebClient는 이렇게 이벤트에 반응형으로 동작하도록 설계되었습니다.
그래서 반응성, 탄력성, 가용성, 비동기성을 보장하는 Spring React 프레임워크를 사용합니다.

## RestTemplate과 WebClient의 주요 정리
아래는 `RestTemplate`을 사용하는 Spring Boot1과 `WebClient`를 사용하는 Spring Boot2의 성능비교 결과입니다.
1000명까지는 비슷하지만 동시사용자가 늘수록 RestTemplate은 급격하게 느려지는것을 볼 수 있습니다.
![RestTemplate vs WebClient](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FxShTd%2FbtqXY0PJEA5%2FDuslUaXHeezPXttXbqpyHK%2Fimg.png)

| **특징**                     | **RestTemplate**                                    | **WebClient**                                       |
|-----------------------------|----------------------------------------------------|----------------------------------------------------|
| **비동기 처리**             | 지원하지 않음                                      | 지원 (Async, Non-blocking)                          |
| **스트리밍 지원**           | 제한적                                             | 완벽 지원                                           |
| **모던 API**                | 구식                                               | 최신, 유연한 API                                    |
| **성능**                    | 동기 방식으로 제한적                               | 비동기 및 스트리밍으로 높은 성능                     |
| **프레임워크 지원**         | Spring MVC와 호환                                  | Spring WebFlux와 호환                               |
| **Future 지원**             | 제한적                                             | 완벽 지원                                           |
| **에러 처리**               | 간단한 에러 처리                                   | 세분화된 에러 처리 및 리액티브 방식의 예외 처리     |


## 왜 우리 서비스(ReadIt)에서 WebClient가 필요할까?
앞서 설명드렸던 것 처럼 `RestTemplate`과 `WebClient`의 주된 차이점은 동기 / 비동기 방식과 동시 사용자수가 늘어날수록 성능의 차이가 크다는 점입니다.
저희 서비스에서 외부 API를 호출하는 부분은 크게 3가지입니다.
- OAuth를 통한 로그인(카카오, 네이버, 구글)
- FastAPI의 크롤러 호출
- GPT 요청 후 응답 받기

FastAPI와 GPT에 대한 요청을 동기적으로 처리할 경우, FastAPI에서 크롤러 관련 로직이 끝날 때까지 대기해야 합니다(하루치의 글을 크롤러가 크롤링하는 데 약 2시간 소요). 또한, GPT에게 사용자가 글을 보고 난 후 요약한 것에 대한 점수를 요청할 때 GPT의 응답을 대기해야 합니다(약 10초 소요). 이러한 대기 시간 때문에 동기 방식이 매우 비효율적입니다.
더하여, 현재는 사용자가 적지만, 향후 사용자가 많이 늘었을 때 효율성을 대비하여 성능에 영향을 미칠 수 있는 부분을 고려해 WebClient를 적용하기로 하였습니다. WebClient의 비동기 처리와 높은 성능은 향후 서비스 확장성과 안정성을 보장할 수 있습니다.

## 개발이 진행되고 이미 RestTempalte를 너무 많이써버렸어....
저희가 `WebClient`로 전환하기 전에 이미 개발이 많이 진행된 상태였고, `RestTemplate`로 대부분의 코드를 작성했기 때문에 한 번에 모든 것을 WebClient로 바꾸기는 무리라고 생각했습니다. 그래서 첫 번째로 생각한 부분이 `RestTemplate을 그래도 최적화해서 사용하자!`라는 것이었습니다.

초기 RestTemplate 설정은 단순히 TIMEOUT만 설정해놓고 사용했으며, 이러한 설정을 다음과 같이 변경했습니다.
- 변겅 전
```java
@Configuration
public class RestTemplateConfig {
    private static final int TIMEOUT_SECONDS = 2;

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder) {
        return restTemplateBuilder.setConnectTimeout(Duration.ofSeconds(TIMEOUT_SECONDS))
                .setReadTimeout(Duration.ofSeconds(TIMEOUT_SECONDS)).build();
    }
}

```
- 변경 후
```java
@Configuration
public class RestTemplateConfig {
    private static final int TIMEOUT_SECONDS = 2;
    private static final int MAX_TOTAL_CONNECTIONS = 50;
    private static final int MAX_ROUTE_CONNECTIONS = 50;

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder) {
    public HttpClient httpClient() {
        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectTimeout(TIMEOUT_SECONDS, TimeUnit.SECONDS)
                .setResponseTimeout(TIMEOUT_SECONDS, TimeUnit.SECONDS)
                .build();

        PoolingHttpClientConnectionManager connectionManager = new PoolingHttpClientConnectionManager();
        connectionManager.setMaxTotal(MAX_TOTAL_CONNECTIONS);
        connectionManager.setDefaultMaxPerRoute(MAX_ROUTE_CONNECTIONS);

        return restTemplateBuilder.setConnectTimeout(Duration.ofSeconds(TIMEOUT_SECONDS))
                .setReadTimeout(Duration.ofSeconds(TIMEOUT_SECONDS))
                .additionalMessageConverters(new MappingJackson2HttpMessageConverter())
        return HttpClientBuilder.create()
                .setDefaultRequestConfig(requestConfig)
                .setConnectionManager(connectionManager)
                .build();
    }
}

    @Bean
    public HttpComponentsClientHttpRequestFactory clientHttpRequestFactory(HttpClient httpClient) {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory(httpClient);
        return factory;
    }

    @Bean
    public RestTemplate restTemplate(HttpComponentsClientHttpRequestFactory clientHttpRequestFactory) {
        return new RestTemplate(clientHttpRequestFactory);
    }
}

```
### 변경 전후 코드의 차이점
변경 전후 코드의 차이점을 주된 내용으로 설명하겠습니다:

#### 타임아웃 설정:
- **변경 전**: RestTemplateBuilder를 사용하여 connectTimeout과 readTimeout을 각각 설정했습니다.
- **변경 후**: RequestConfig를 사용하여 타임아웃 설정을 보다 세분화하고, HttpClient의 setConnectTimeout과 setResponseTimeout을 설정했습니다.

#### 연결 관리:
- **변경 전**: 연결 관리 설정이 없었습니다.
- **변경 후**: PoolingHttpClientConnectionManager를 사용하여 최대 연결 수(MAX_TOTAL_CONNECTIONS)와 각 경로별 최대 연결 수(MAX_ROUTE_CONNECTIONS)를 설정했습니다. 이를 통해 효율적인 연결 관리를 구현했습니다.

#### HttpClient 설정:
- **변경 전**: HttpClient 설정 없이 기본 설정으로 RestTemplate을 사용했습니다.
- **변경 후**: HttpClientBuilder를 사용하여 RequestConfig와 PoolingHttpClientConnectionManager를 적용한 HttpClient를 설정했습니다.

#### HttpRequestFactory 설정:
- **변경 전**: 별도의 HttpRequestFactory 설정 없이 기본 RestTemplate을 사용했습니다.
- **변경 후**: HttpComponentsClientHttpRequestFactory를 사용하여 HttpClient를 적용한 RestTemplate을 생성했습니다.

기존의 단순 타임아웃 설정에서 벗어나, HttpClient와 연결 풀을 사용하여 보다 효율적인 연결 관리와 성능 최적화를 구현했습니다. 이러한 변경을 통해 RestTemplate의 성능을 향상시키고, 시스템의 안정성을 높일 수 있습니다.

## 본격적으로 WebClient로 리팩토링 하기
WebClient로 리팩토링하기 앞서 WebClient를 설정해주었습니다.
```java
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
```
주된 설정 내용은 다음과 같습니다:

- **ExchangeStrategies**: 최대 메모리 크기를 설정하고 요청 및 응답의 로깅을 활성화합니다.
- **ReactorClientHttpConnector**: HttpClient를 사용하여 연결 타임아웃, 응답 타임아웃, 읽기 및 쓰기 타임아웃을 설정합니다.
- **SSL 설정**: SSL 컨텍스트를 설정하여 InsecureTrustManagerFactory를 사용합니다.
- **요청 및 응답 로깅**: ExchangeFilterFunction을 사용하여 요청 및 응답을 로깅합니다.

## OAuth 적용
- 변경 전
```java
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

```
```java
@Component
@RequiredArgsConstructor
public class KakaoOAuthTokenClient implements OAuthTokenClient {
    private static final String ACCESS_TOKEN_URI = "https://kauth.kakao.com/oauth/token";
    private static final String GRANT_TYPE = "authorization_code";

    private final RestTemplate restTemplate;
    private final KakaoCredentials kakaoCredentials;

    @Override
    public String getAccessToken(String authCode, String redirectUri) {
        HttpHeaders header = createRequestHeader();
        MultiValueMap<String, String> body = createRequestBodyWithAuthCode(authCode, redirectUri);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, header);
        ResponseEntity<KakaoTokenResponse> kakaoTokenResponse = getKakaoToken(request);

        return requireNonNull(requireNonNull(kakaoTokenResponse.getBody())).accessToken();
    }
    
    private ResponseEntity<KakaoTokenResponse> getKakaoToken(HttpEntity<MultiValueMap<String, String>> request) {
        try {
            return restTemplate.exchange(
                    ACCESS_TOKEN_URI,
                    POST,
                    request,
                    KakaoTokenResponse.class
            );
        } catch (HttpClientErrorException e) {
            throw new TokenMissingException();
        }
    }
}

```
- 변경 후
```java
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
                    if(kakaoMemberResponse == null) {
                        sink.error(new MemberNotFoundException());
                        return;
                    }
                    sink.next(KakaoMemberResponse.builder()
                            .kakaoAccount(kakaoMemberResponse.getKakaoAccount())
                            .build());
                });
    }
}

```
```java
@Component
@RequiredArgsConstructor
public class KakaoOAuthTokenClient implements OAuthTokenClient {
    private static final String ACCESS_TOKEN_URI = "https://kauth.kakao.com/oauth/token";
    private static final String GRANT_TYPE = "authorization_code";

    private final WebClient webClient;
    private final KakaoCredentials kakaoCredentials;

    @Override
    public Mono<String> getAccessToken(String authCode, String redirectUri) {
        MultiValueMap<String, String> body = createRequestBodyWithAuthCode(authCode, redirectUri);

        return webClient.post()
                .uri(ACCESS_TOKEN_URI)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .bodyValue(body)
                .retrieve()
                .onStatus(httpStatus -> httpStatus.is4xxClientError(), clientResponse -> Mono.error(new TokenMissingException()))
                .bodyToMono(KakaoTokenResponse.class)
                .handle((kakaoTokenResponse, sink) -> {
                    if (kakaoTokenResponse == null || kakaoTokenResponse.accessToken() == null) {
                        sink.error(new TokenMissingException());
                        return;
                    }
                    sink.next(kakaoTokenResponse.accessToken());
                });
    }
}
```

## FastAPI
- 변경 전
```java
@RequiredArgsConstructor
public class FastAPIClient {

    private final FastAPICredentials fastAPICredentials;
    private final RestTemplate restTemplate;

    public FastAPIArticleResponse getArticle(String link){
    private ResponseEntity<FastAPIArticleResponse> getFastAPIArticle(String link) {
        try {
            return restTemplate.exchange(
                    fastAPICredentials.getUri() + "?url=" + link,
                    GET,
                    null,
                    FastAPIArticleResponse.class
            );
        } catch (HttpClientErrorException e) {
            throw new ArticleNotFoundException();
        }
    }
}

```

- 변경 후
```java
@Component
@RequiredArgsConstructor
public class FastAPIClient {

    private final FastAPIURI fastAPIURI;
    private final WebClient webClient;

    public FastAPIArticleResponse getArticle(String link){
        return getFastAPIArticle(link)
                .block();
    }

    private Mono<FastAPIArticleResponse> getFastAPIArticle(String link) {
        System.out.println(fastAPIURI.getUri() + "?url=" + link);
        return webClient.get()
                .uri(fastAPIURI.getUri() + "?url=" + link)
                .retrieve()
                .bodyToMono(FastAPIArticleResponse.class)
                .onErrorMap(Exception.class, ex -> new ArticleNotFoundException());
    }
}
```

## 결론
이번 리팩토링을 통해 `RestTemplate`을 사용하여 개발된 기존 코드들을 `WebClient`로 점진적으로 전환할 수 있었습니다. `WebClient`의 비동기 처리와 높은 성능을 활용하여 서비스의 확장성과 안정성을 높일 수 있었습니다.

- **RestTemplate 최적화**: 먼저 `RestTemplate`의 설정을 개선하여 성능을 향상시키고, 점진적으로 `WebClient`로 전환하였습니다.
- **WebClient 설정**: WebClient의 설정을 통해 연결 타임아웃, 응답 타임아웃, 읽기 및 쓰기 타임아웃을 최적화하고, SSL 설정과 요청 및 응답 로깅을 추가하여 개발 및 운영 환경에서의 안정성을 보장했습니다.
- **OAuth와 FastAPI 적용**: OAuth와 FastAPI 통신에 `WebClient`를 적용하여 비동기적으로 처리하고, 예외 처리를 통해 보다 견고한 코드를 작성했습니다.

이번 리팩토링 작업을 통해 저희 서비스가 더 많은 동시 사용자 수를 처리할 수 있게 되었으며, 비동기 처리 덕분에 외부 API 요청 대기 시간 동안 다른 작업을 수행할 수 있게 되어 전반적인 성능이 개선되었습니다.