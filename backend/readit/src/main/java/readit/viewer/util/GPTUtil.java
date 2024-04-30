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
import readit.viewer.exception.InvalidAPIResponseException;
import readit.viewer.exception.JsonParsingException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Component
@RequiredArgsConstructor
public class GPTUtil {
    private final ChatGPTConfig chatGPTConfig;
    private final RestTemplateConfig restTemplateConfig;

    @Value("${openai.model}")
    private String model;

    // 어려운 단어 리스트 추출 프롬프트 요청
    public List<Word> promptWords(List<GPTMessage> messages) {
        String response = sendPromptAndGetResponse(messages);
        return extractWordsFromContent(parseResponse(response));
    }

    // 요약 평가 프롬프트 요청
    public SubmissionResponse promptSummary(List<GPTMessage> messages) {
        String response = sendPromptAndGetResponse(messages);
        return extractScoreAndFeedbackFromContent(parseResponse(response));
    }

    // GPT API 요청 및 응답
    private String sendPromptAndGetResponse(List<GPTMessage> messages) {
        GPTPrompt gptPrompt = GPTPrompt.of(model, messages, 2000, 0.5F);
        HttpHeaders headers = chatGPTConfig.httpHeaders();
        HttpEntity<GPTPrompt> requestEntity = new HttpEntity<>(gptPrompt, headers);
        ResponseEntity<String> response = restTemplateConfig.restTemplate(new RestTemplateBuilder())
                .exchange("https://api.openai.com/v1/chat/completions",
                        HttpMethod.POST,
                        requestEntity,
                        String.class);

        return response.getBody();
    }

    // Response JSON Parsing
    private Optional<String> parseResponse(String response) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            ChatCompletion chatCompletion = objectMapper.readValue(response, ChatCompletion.class);
            Choice choice = chatCompletion.getChoices().get(0);
            Map<String, Object> message = choice.getMessage();
            return Optional.ofNullable(message.get("content").toString());
        } catch (JsonProcessingException e) {
            throw new JsonParsingException();
        }
    }

    // Response Content로부터 wordList 추출
    private List<Word> extractWordsFromContent(Optional<String> optionalContent) {
        if (optionalContent.isPresent()) {
            String content = optionalContent.get();
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
        } else {
            log.info("ERROR: CONTENT_NOT_EXISTS");
            return new ArrayList<>();
        }
    }

    private SubmissionResponse extractScoreAndFeedbackFromContent(Optional<String> optionalContent) {
        if (optionalContent.isPresent()) {
            String content = optionalContent.get();
            Integer score = extractScore(content);
            String feedback = extractFeedback(content);
            return new SubmissionResponse(score, feedback);
        } else {
            throw new InvalidAPIResponseException();
        }
    }

    private int extractScore(String summary) {
        Pattern pattern = Pattern.compile("점수: (\\d+)점");
        Matcher matcher = pattern.matcher(summary);
        if (matcher.find()) {
            return Integer.parseInt(matcher.group(1));
        }
        return 0;
    }

    private String extractFeedback(String summary) {
        int goodPointIndex = summary.indexOf("잘한 점:");
        int badPointIndex = summary.indexOf("못한 점:");

        if (goodPointIndex != -1 && badPointIndex != -1) {
            return summary.substring(goodPointIndex).trim();
        }

        return "";
    }

}

