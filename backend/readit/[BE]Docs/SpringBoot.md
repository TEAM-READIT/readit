# [BE] Spring boot 버전

## Spring Boot 3.x 채택과정
![Spring Boot version](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcUyqha%2FbtsmsP4HO2g%2F2KA22XQAw1UDfRM3oNiJsK%2Fimg.png)

#### 24년 5월 기준으로, Spring Boot 2.x 시리즈의 최신 버전인 2.7의 공식 지원이 종료된 상태입니다. 이에 따라, 저희 팀은 2.x 시리즈를 고려 대상에서 제외하고 3.x 버전 중에서 선택하기로 결정했습니다.

저희 팀은 Spring Boot 3.x 버전 선택에 대한 많은 토의 과정을 거쳤고 최종적으로는 3.2버전을 사용하기로 하였습니다. 3.2버전의 선택의 근거는 매우 현실적이였습니다.

3.2 버전 선택의 주요 근거는 두 가지로 요약할 수 있습니다.

첫째, `장기적인 관점`입니다. 3.1버전의 지원 기간은 24년 5월로 3.2버전보다 짧은것을 사진에서 확인할수 있습니다. 장기적으로 프로젝트를 유지보수하고 발전시킬 계획이 있는 점, 최신 버전일수록 활발한 커뮤니티를 통한 지속적인 지원과 빠른 버그 수정을 기대할 수 있으며, 추후 확장에 용이하다는 점에서 3.2 버전을 선택했습니다.

두번째는 3.2버전의 주요 특징인 `RestClient 지원`입니다. 저희 서비스는 ChatGPT, OAuth2, FastAPI 등 외부와 HTTP 통신을 하는 API가 많습니다.
기존에도 RestTemplate과 WebClient와 같은 HTTP Client를 제공하고 있었지만, 각각 문제점을 가지고 있었습니다.
RestTemplate를 사용하는 코드는 직관적이지 못하며, WebClient와 HttpInterface는 web-flux 의존성을 필요로 합니다.
Spring Boot 3.2에서는 RestClient을 지원함으로서 web-flux에 의존하지 않으면서도 fluent한 API를 제공합니다.

이와 같은 결정 과정을 통해, 저희 팀은 Spring Boot 3.2 버전을 채택하여 프로젝트를 진행하기로 결정했습니다.

## JPA

JPA는 자바 진영에서 ORM(Object-Relational Mapping) 기술 표준으로 사용되는 인터페이스의 모음입니다. 저희 팀은 프로젝트의 데이터 영속성 관리 방법을 결정하기 위해 여러 옵션을 고려했습니다. 그 과정에서 Java Persistence API(JPA) 사용의 이점이 명확해졌고, 최종적으로 JPA를 채택하기로 결정했습니다. JPA 선택의 주된 근거는 다음과 같습니다.

### Object와 RDB간의 패러다임 불일치 해결

JAVA에 존재하는 상속관계를 객체간의 상속관계를 지원하지 않는 데이터베이스에서 JPA는 이러한 문제를 해결해 줄 수 있습니다.
#### example
![JPA example](https://velog.velcdn.com/images/dirn0568/post/5581352c-4732-4014-982c-b0d1209356ba/image.png)

### JOIN 연산의 단순화
JOIN 연산이 빈번하게 발생하는 경우, 복잡성이 급격히 증가하는 경향이 있습니다. JPA를 사용하면 이러한 복잡성을 크게 줄일 수 있습니다. 객체 관계 매핑(ORM)을 통해, 복잡한 SQL JOIN 연산을 간단한 객체 지향 모델로 추상화하여 처리할 수 있습니다. 이는 개발자가 데이터베이스 구조보다는 비즈니스 로직에 더 집중할 수 있게 하여, 개발 생산성과 코드의 유지보수성을 높여줍니다.