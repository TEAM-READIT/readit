package readit.viewer.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import readit.viewer.domain.dto.dictionary.DictionarySearchResult;
import readit.viewer.domain.dto.gpt.Item;
import readit.viewer.domain.dto.Word;
import readit.viewer.exception.APIResponseMissingException;
import readit.viewer.exception.JsonParsingException;

@Slf4j
@Component
@RequiredArgsConstructor
public class DictionaryUtil {
    private final RestTemplate restTemplate;
    @Value("${dictionary.api-key}")
    private String apiKey;

    public Word search(String keyword) {
        String word = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
        String url = "https://stdict.korean.go.kr/api/search.do?key=" + apiKey
                + "&req_type=json&type_search=search&q=" + word;

        ResponseEntity<String> response = restTemplate
                .exchange(
                        url,
                        HttpMethod.GET,
                        null,
                        String.class);

        // 응답을 못 받았거나 검색 결과가 없을 때
        if (response.getStatusCode().isError() || !response.hasBody()) {
            throw new APIResponseMissingException();
        }

        DictionarySearchResult result = parseJson(response.getBody())
                .orElseThrow(JsonParsingException::new);

        return Word.of(keyword, parseDefinition(result));
    }

    private Optional<DictionarySearchResult> parseJson(String response) {
        try {
            ObjectMapper om = new ObjectMapper();
            DictionarySearchResult responseBody = om.readValue(response, DictionarySearchResult.class);
            return Optional.of(responseBody);
        } catch (JsonProcessingException e) {
            return Optional.empty();
        }
    }

    private String parseDefinition(DictionarySearchResult result) {
        if (result.channel() != null && result.channel().item().length > 0) {
            Item item = result.channel().item()[0];
            if (item.sense() != null) {
                return item.sense().definition();
            }
        }

        return "검색 결과가 존재하지 않습니다.";
    }
}
