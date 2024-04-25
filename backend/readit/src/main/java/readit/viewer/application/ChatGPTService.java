package readit.viewer.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import readit.common.config.ChatGPTConfig;
import readit.common.config.RestTemplateConfig;
import readit.viewer.domain.dto.ChatCompletion;
import readit.viewer.domain.dto.Choice;
import readit.viewer.domain.dto.GPTRequestDto;
import readit.viewer.domain.dto.Word;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatGPTService {
    private final ChatGPTConfig chatGPTConfig;
    private final RestTemplateConfig restTemplateConfig;

    @Value("${openai.model}")
    private String model;

    public List<Word> prompt(GPTRequestDto gptRequestDto) throws JsonProcessingException {
        log.debug("[+] 프롬프트를 수행합니다.");

        Map<String, Object> result;

        // [STEP1] 토큰 정보가 포함된 Header를 가져옵니다.
        HttpHeaders headers = chatGPTConfig.httpHeaders();

        ObjectMapper om = new ObjectMapper();


        // [STEP2] 통신을 위한 RestTemplate을 구성합니다.
        HttpEntity<GPTRequestDto> requestEntity = new HttpEntity<>(gptRequestDto, headers);
        ResponseEntity<String> response = restTemplateConfig.restTemplate(new RestTemplateBuilder())
                .exchange(
                        "https://api.openai.com/v1/chat/completions",
                        HttpMethod.POST,
                        requestEntity,
                        String.class);

        // [STEP4] response를 parsing해서 원하는 형태로 매핑합니다.
        List<Word> wordList = new ArrayList<>();
        ChatCompletion chatCompletion;

        try {
            chatCompletion = om.readValue((String) response.getBody(), ChatCompletion.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Choice choice = chatCompletion.getChoices().get(0);
        Map<String, Object> message = choice.getMessage();
        Optional<String> content = Optional.ofNullable(message.get("content").toString());

        if (content.isPresent()) {
            log.info(content.get());

            String text = content.get();

            ArrayList<String> lines = new ArrayList<>(Arrays.asList(text.split("\n")));
            // 단어, 뜻을 저장할 ArrayList 생성
            ArrayList<String> words = new ArrayList<>();
            ArrayList<String> meanings = new ArrayList<>();

            // 각 줄을 순회하면서 번호, 단어, 뜻을 추출하여 ArrayList에 저장
            for (String line : lines) {
                String[] parts = line.split(": ");
                String[] numberAndWord = parts[0].split("\\. ");

                if (parts.length > 1 && numberAndWord.length > 1) {
                    words.add(numberAndWord[1]);
                    meanings.add(parts[1]);
                }
            }

            // 결과 출력
            for (int i = 0; i < words.size(); i++) {
                Word word = Word.builder()
                        .word(words.get(i))
                        .definition(meanings.get(i))
                        .build();
                wordList.add(word);
            }

        } else {
            log.info("ERROR: CONTENT_NOT_EXISTS");
        }

        return wordList;
    }

}
