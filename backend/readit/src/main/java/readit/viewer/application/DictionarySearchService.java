package readit.viewer.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import readit.common.config.RestTemplateConfig;
import readit.viewer.domain.dto.DictionarySearchResult;
import readit.viewer.domain.dto.Item;
import readit.viewer.exception.JsonParsingException;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
@RequiredArgsConstructor
public class DictionarySearchService {
    private final RestTemplateConfig restTemplateConfig;
    @Value("${dictionary.api-key}")
    private String apiKey;

   public String search(String keyword) {
       String word = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
       String url = "https://stdict.korean.go.kr/api/search.do?key=" + apiKey
               + "&req_type=json&type_search=search&q=" + word;

       ResponseEntity<String> response = restTemplateConfig.restTemplate(new RestTemplateBuilder())
               .exchange(
                       url,
                       HttpMethod.GET,
                       null,
                       String.class);

       try {
           ObjectMapper om = new ObjectMapper();
           DictionarySearchResult responseBody = om.readValue(response.getBody(), DictionarySearchResult.class);
           return parseDefinition(responseBody);
       } catch (JsonProcessingException e) {
           throw new JsonParsingException();
       } catch (IllegalArgumentException e) {
           return "검색 결과가 없습니다.";
       }
   }

   private String parseDefinition(DictionarySearchResult result) {
       if (result.channel() != null && result.channel().item().length > 0) {
           Item item = result.channel().item()[0];
           if (item.sense() != null) {
               return item.sense().definition();
           }
       }

       return "검색 결과가 없습니다.";
   }
}
