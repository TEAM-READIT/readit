package readit.viewer.util;

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
import org.springframework.stereotype.Component;
import readit.common.config.ChatGPTConfig;
import readit.common.config.RestTemplateConfig;
import readit.viewer.domain.dto.*;
import readit.viewer.domain.dto.response.SubmissionResponse;

import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class GPTUtil {
    private final ChatGPTConfig chatGPTConfig;
    private final RestTemplateConfig restTemplateConfig;

    @Value("${openai.model}")
    private String model;

    public List<Word> promptWords(List<GPTMessage> messages) {
        String response = sendPromptAndGetResponse(messages);
        return parseResponseAndGetWords(response);
    }

    public SubmissionResponse promptSummary(List<GPTMessage> messages) {
        String response = sendPromptAndGetResponse(messages);
        System.out.println(response);
        return new SubmissionResponse(10, "2");
    }

    // GPT API 요청 및 응답
    private String sendPromptAndGetResponse(List<GPTMessage> messages) {
        GPTPrompt gptPrompt = GPTPrompt.of(model, messages, 2000, 0.5F);
        HttpHeaders headers = chatGPTConfig.httpHeaders();
        HttpEntity<GPTPrompt> requestEntity = new HttpEntity<>(gptPrompt, headers);
        ResponseEntity<String> response = restTemplateConfig.restTemplate(new RestTemplateBuilder())
                .exchange("https://api.openai.com/v1/chat/completions", HttpMethod.POST, requestEntity, String.class);
        return response.getBody();
    }

    private List<Word> parseResponseAndGetWords(String response) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            ChatCompletion chatCompletion = objectMapper.readValue(response, ChatCompletion.class);
            Choice choice = chatCompletion.getChoices().get(0);
            Map<String, Object> message = choice.getMessage();
            Optional<String> content = Optional.ofNullable(message.get("content").toString());

            if (content.isPresent()) {
                log.info(content.get());
                return extractWordsFromContent(content.get());
            } else {
                log.info("ERROR: CONTENT_NOT_EXISTS");
                return new ArrayList<>();
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private List<Word> extractWordsFromContent(String content) {
        ArrayList<String> lines = new ArrayList<>(Arrays.asList(content.split("\n")));
        ArrayList<Word> wordList = new ArrayList<>();

        for (String line : lines) {
            String[] parts = line.split(": ");
            String[] numberAndWord = parts[0].split("\\. ");

            if (parts.length > 1 && numberAndWord.length > 1) {
                wordList.add(new Word(numberAndWord[1], parts[1]));
            }
        }
        return wordList;
    }

}
