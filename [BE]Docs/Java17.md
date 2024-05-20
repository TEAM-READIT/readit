# [BE] Java 17 채택과정

## 자바 17
Java17에서 제공하는 주요기능을 살펴보겠습니다.

### JDK 17
|Type|Features|Content|
|:---:|:---|:---|
|패키지|향상된 의사 난수 생성기|의사 난수 생성기(Pseudo-Random Number Generator)를 위한 새로운 인터페이스 타입과 구현을 제공|
|패키지|신규 Mac OS 렌더링 파이프라인|Apple 메탈 API를 사용하는 Mac OS용 Java  파이프라인을 구현|
|기능|**텍스트 블록 기능 추가**|기존 String을 여러 줄 작성할 때 사용 가능한 기능, 가독성 있는 코드 지원|
|기능|Switch 표현식 기능 향상|Switch 문 이용 시 값을 반환하여 이용 가능 하며, 람다 스타일 구문을 사용 가능|
|기능|**Record Data class 추가**|immutable 객체를 생성하는 새로운 유형의 클래스로 기존 toString, equals, hashCode Method에 대한 구현을 자동 제공|
|기능|Instanceof 매칭|이전 버전 경우 Instanceof 내부에서 객체를 캐스팅 하는 과정이 필요하였으나, 캐스팅 과정을 내부에서 지원할 수 있도록 변경|
|기능|NumberFormat 클래스 기능 향상|기존 숫자 Format 클래스(NumberFormat) 내 Method 추가(getCompactNumberInstance)|
|기능|DateTimeFormatter 클래스 기능 향상|기존 날짜 Format 클래스(DateTimeFormatter) 내 패턴 Method 형식 추가("B")|
|기능|봉인(Sealed) 클래스|무분별한 상속을 막기 위한 목적으로 등장한 기능으로 지정한 클래스 외 상속을 허용하지 않으며, 지정한 클래스 외 상속 불가능|
|기능|Stream.toList() 기능 추가|기존, Stream을 List로 변환 시 Collectors에서 기능을 찾아 사용했다면 Java17 부터는 Collectors호출 없이 toList()만으로 변환이 가능|

## 우리 팀이 JDK 17을 도입한 이유

### record Data Class
> record는 Java 16에서 정식 기능으로 추가되었으며, Java 17에서도 계속 사용됩니다. 데이터를 담기 위한 클래스를 간결하게 정의할 수 있게 해주며 데이터 전송 객체(Data Transfer Object, DTO)나 불변 데이터 컨테이너를 작성할 때 매우 유용한 기능을 제공합니다.

| 특징 | 설명                                                                                                                                                                   |
|---|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 간결성 | 전통적인 자바 클래스를 사용하여 데이터 컨테이너를 만들 때 필요한 `필드`, `생성자`, `Getter`, `equals()`, `hashCode()`, `toString()` 등을 모두 명시적으로 선언해야 합니다. `record`를 사용하면 이 모든 것이 한 줄의 코드로 간결하게 표현됩니다. |
| 불변성 | `record`의 인스턴스는 기본적으로 불변입니다. 이는 멀티스레드 환경에서 안전성과 함수형 프로그래밍 패러다임을 지원합니다.                                                                                               
| 데이터중심 | `record` 는 데이터를 저장하고 전달하는 요도에 초점을 맞추고 있습니다. 이는 코드의 명확성과 유지 관리성을 향상시킵니다.                                                                                              

저희 서비스에서 record를 사용한 예시는 다음과 같습니다
```Java
public record GetSubmit(
        Integer problemNumber,
        @NotNull(message = "답을 입력하지 않았습니다.")
        @Min(value = 1, message = "보기 번호는 1이상 5이하입니다.")
        @Max(value = 5, message = "보기 번호는 1이상 5이하입니다.")
        Integer optionNumber
) {
}

```
`record`에 유효성 검사를 추가하여 코드를 간결하게 작성한 것을 볼수있습니다.

### Stream.toList() 기능
> Java 16부터 도입된 Stream.toList() 메서드는 스트림의 결과를 새로운 리스트로 직접 수집하는 간결한 방법을 제공합니다. 이 메서드를 사용하면 Collectors.toList() 대신 스트림의 결과를 리스트로 바로 변환할 수 있어 코드를 더욱 간결하게 만들 수 있습니다.

저희 서비스에서 Stream.toList()를 사용한 코드는 다음과 같습니다.

```Java
@Transactional(readOnly = true)
public GetChallengeStatisticsResponse getChallengeStatistics(Integer memberId) {
    List<MemberProblem> memberProblemList = memberProblemQueryRepository.findDateScore(memberId);

    List<GetScore> scoreList = memberProblemList.stream()
            .map(memberProblem -> GetScore.of(memberProblem.getSolvedAt(), memberProblem.getScore()))
            .toList();

    return GetChallengeStatisticsResponse.from(scoreList);
}
```

> stream().toList를 사용하기 앞서 Collectors.toList()와 stream().toList의 차이를 알 필요가 있었습니다.

#### Collectors.toList() , Stream.toList()

| 메서드               | 반환 타입            | 설명                                                                                   |
|-------------------|------------------|--------------------------------------------------------------------------------------|
| `Collectors.toList()` | `List<T>`         | 변경 가능한 리스트를 반환합니다. 반환된 리스트의 구체적인 타입은 보장되지 않으며, 구현에 따라 달라질 수 있습니다.   |
| `Stream.toList()`     | `List<T>` (불변) | Java 16부터 사용 가능한 메서드로, 불변 리스트를 반환합니다. 리스트에 대한 변경 시도 시 `UnsupportedOperationException` 발생합니다. |

Collectors.toList()와 Stream.toList()의 주요 차이는 변경 가능 유무입니다. 변경이 필요 없는 리스트는 Stream.toList()를, 변경 가능한 리스트는 Collectors.toList()를 사용하기로 하였습니다.
