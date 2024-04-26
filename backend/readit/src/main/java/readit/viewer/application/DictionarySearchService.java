package readit.viewer.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import readit.viewer.domain.dto.DictionarySearchResult;
import readit.viewer.domain.dto.Item;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
@RequiredArgsConstructor
public class DictionarySearchService {
    @Value("${dictionary.api-key}")
    private String apiKey;

   public String search(String keyword) {
       StringBuilder responseBody = new StringBuilder();
       try {
           String word = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
           URL url = new URL("https://stdict.korean.go.kr/api/search.do?key=" + apiKey
                   + "&req_type=json&type_search=search&q=" + word);
           HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
           connection.setRequestMethod("GET");

           BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));

           String line = "";
           while ((line = br.readLine()) != null) {
               System.out.println(line);
               responseBody.append(line);
           }
           br.close();

       } catch (Exception e) {
           e.printStackTrace();
       }

       return parseDefinition(responseBody.toString());
   }

   private String parseDefinition(String responseBody) {
       try {
           ObjectMapper mapper = new ObjectMapper();
           DictionarySearchResult result = mapper.readValue(responseBody, DictionarySearchResult.class);
           if (result.getChannel() != null && result.getChannel().getItem().length > 0) {
               Item item = result.getChannel().getItem()[0];
               if (item.getSense() != null) {
                   return item.getSense().getDefinition();
               }
           }
       } catch (Exception e) {
           e.printStackTrace();
       }

       return null;
   }

}
