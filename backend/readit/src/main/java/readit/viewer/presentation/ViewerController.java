package readit.viewer.presentation;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import readit.viewer.application.ChatGPTService;
import readit.viewer.application.DictionarySearchService;
import readit.viewer.domain.dto.GPTMessage;
import readit.viewer.domain.dto.GPTRequestDto;
import readit.viewer.domain.dto.Word;
import readit.viewer.domain.dto.response.WordListResponse;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/viewer")
public class ViewerController {

    private final ChatGPTService chatGPTService;
    @Value("${openai.model}")
    private String model;

    private final DictionarySearchService dictionarySearchService;

    @GetMapping("/{articleId}")
    public WordListResponse getArticleViewer(@PathVariable Integer articleId) throws JsonProcessingException {
        // todo: 사용자가 읽은 글을 눌렀는지 안 읽은 글을 눌렀는지 체크 (-> memberArticleRepository)
        // todo: 읽은 글이면 읽은 글에서 메모까지 묶어서 불러 오기
            // todo: 어려운 단어가 있는 지 체크 (hasWord)
            // todo: 어려운 단어가 있으면 그대로 불러 오기
            // todo: 어려운 단어가 없으면 chatgpt한테 요청하기

        // todo: article_id로 글 찾아 온 뒤 뉴스 본문 추가
        // todo: 아래 모든 로직 service로 들어가기
        StringBuilder sb = new StringBuilder();
        sb.append("면접 절차가 진행 중인 지원자들에 대한 평가도 무속인과 함께 진행했다는게 하이브 측의 설명이다. 하이브는 무속인이 긍정 평가를 내놓은 지원자들은 대부분 채용 전형에 합격, 일부는 어도어에 재직 중인 것으로 확인됐다고 밝혔다. 또한 타 부서에 재직 중이던 일부 하이브 직원들의 전환배치를 검토하는 과정에서도 대상자들의 신상 정보를 무속인과 공유하며 함께 평가를 진행했다.\n" +
                "\n" +
                "하이브 측은 민 대표와 무속인이 하이브 경영진들을 대상으로 주술활동을 한 대목도 등장한다고 전했다. 무속인이 민 대표 자택으로 ‘머리 모양으로 빚은’ 떡을 보낸다고 하자 민 대표는 “이거먹음 애새끼들 좀 트이냐 어떤 도움이 있지”라고 물었다. 이에 무속인은 “아주많이 정신차림”이라고 대답했다.\n" +
                "\n" +
                "경영진에 대한 비하 발언도 등장한다. 방시혁 하이브 의장에 대해 민 대표는 “아니 기본기가 너무 없고 순전히 모방, 베끼기”라고 하자 무속인은 “베껴두 돈되게 하니까 배워”라고 조언했다. 무속인이 “방가놈두 지가 대표아닌데 지가 기획해서 여기까지 된거 아냐?”라고 물을 때에는 “사실 내꺼 베끼다가 여기까지 온거지 ㅋㅋㅋㅋ”이라고 답하기도 했다. 이 대화가 2021년에 이뤄졌다는 점에서 당시 가장 성공가도를 달리던 방탄소년단이 본인을 모방해 만든 팀이라는 주장을 한 셈이다.");
        sb.append("이 글에서 초등학생이 이해하기 어려운 단어와 뜻 목록을 추출해줘. 그리고 강조 기호 없이 텍스트로만 줘.");

        List<GPTMessage> messages = new ArrayList<>();
        GPTMessage message = GPTMessage.builder()
                .role("user")
                .content(sb.toString())
                .build();

        messages.add(message);

        // todo: temperature 값 비교하면서 최적화하기
        GPTRequestDto gptRequestDto = GPTRequestDto.builder()
                .model(model)
                .messages(messages)
                .max_tokens(2000)
                .temperature(0.5F)
                .build();

        WordListResponse wordListResponse = WordListResponse.builder()
                .wordList(chatGPTService.prompt(gptRequestDto))
                .build();

        return wordListResponse;
    }

    @GetMapping("/word/{word}")
    public Word searchMeaning(@PathVariable String word) {
        Word wordResponse = Word.builder()
                .word(word)
                .definition(dictionarySearchService.search(word))
                .build();

        return wordResponse;
    }

}
