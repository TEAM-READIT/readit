package readit.viewer.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import readit.common.config.ChatGPTConfig;
import readit.viewer.config.GPTCredentials;
import readit.viewer.domain.dto.Word;
import readit.viewer.domain.dto.gpt.ChatCompletion;
import readit.viewer.domain.dto.gpt.GPTMessage;
import readit.viewer.domain.dto.gpt.GPTPrompt;
import readit.viewer.domain.dto.gpt.PromptType;
import readit.viewer.domain.dto.response.SubmissionResponse;
import readit.viewer.exception.InvalidAPIResponseException;
import readit.viewer.exception.JsonParsingException;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GPTUtil {
    private final ChatGPTConfig chatGPTConfig;
    private final RestTemplate restTemplate;
    private final GPTCredentials gptCredentials;


    // 어려운 단어 리스트 추출 프롬프트 요청
    @Async
    public CompletableFuture<List<Word>> promptWords(List<GPTMessage> messages) {
        String response = sendPromptAndGetResponse(messages, PromptType.WORDS);
        return CompletableFuture.completedFuture(
                extractWordsFromContent(parseResponse(response)));
    }

    // 요약 평가 프롬프트 요청
    @Async
    public CompletableFuture<SubmissionResponse> promptSummary(List<GPTMessage> messages) {
        String response = sendPromptAndGetResponse(messages, PromptType.SUMMARY);
        return CompletableFuture.completedFuture(
                extractScoreAndFeedbackFromContent(parseResponse(response)));
    }

    // =================================================================

    // GPT API 요청 및 응답
    private String sendPromptAndGetResponse(List<GPTMessage> messages, PromptType type) {
        GPTPrompt gptPrompt = GPTPrompt.of(gptCredentials.getModel(), messages, type);
        HttpHeaders headers = chatGPTConfig.httpHeaders();
        HttpEntity<GPTPrompt> requestEntity = new HttpEntity<>(gptPrompt, headers);

        ResponseEntity<String> response = restTemplate
                .exchange(
                        "https://api.openai.com/v1/chat/completions",
                        HttpMethod.POST,
                        requestEntity,
                        String.class);

        return response.getBody();
    }

    // Response JSON Parsing
    private String parseResponse(String response) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            ChatCompletion chatCompletion = objectMapper.readValue(response, ChatCompletion.class);
            Map<String, Object> message = chatCompletion.getChoices().get(0).getMessage();
            return Optional.ofNullable(message.get("content").toString())
                    .orElseThrow(InvalidAPIResponseException::new);
        } catch (JsonProcessingException e) {
            throw new JsonParsingException();
        }
    }

    // Response Body -> Word List
    private List<Word> extractWordsFromContent(String content) {
        return Arrays.stream(content.split("\n"))
                .map(line -> line.split(": "))
                .filter(parts -> parts.length > 1)
                .map(parts -> {
                    String[] numberAndWord = parts[0].split("\\. ");
                    if (numberAndWord.length < 1) {
                        throw new InvalidAPIResponseException();
                    }
                    return new Word(numberAndWord[1], parts[1]);
                })
                .collect(Collectors.toList());
    }

    // 요약 점수 및 평가 추출
    private SubmissionResponse extractScoreAndFeedbackFromContent(String content) {
            return new SubmissionResponse(extractScore(content), extractFeedback(content));
    }

    // 요약 score parsing
    private int extractScore(String summary) {
        Pattern pattern = Pattern.compile("점수: (\\d+)점");
        Matcher matcher = pattern.matcher(summary);
        if (matcher.find()) {
            return Integer.parseInt(matcher.group(1));
        }
        return 0;
    }

    // 요약 feedback parsing
    private String extractFeedback(String summary) {
        int goodPointIndex = summary.indexOf("잘한 점:");
        int badPointIndex = summary.indexOf("못한 점:");

        if (goodPointIndex != -1 && badPointIndex != -1) {
            return summary.substring(goodPointIndex).trim();
        }

        return "요약 내용이 충분하지 않아 평가를 할 수 없습니다.";
    }

}

