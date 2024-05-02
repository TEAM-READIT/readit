package readit.article.infra;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import readit.article.config.FastAPICredentials;
import readit.article.dto.response.FastAPIArticleResponse;
import readit.article.exception.ArticleNotFoundException;
import static org.springframework.http.HttpMethod.GET;

@Component
@RequiredArgsConstructor
public class FastAPIClient {

    private final FastAPICredentials fastAPICredentials;
    private final RestTemplate restTemplate;

    public FastAPIArticleResponse getArticle(String link){
        ResponseEntity<FastAPIArticleResponse> response = getFastAPIArticle(link);
        return response.getBody();
    }

    private ResponseEntity<FastAPIArticleResponse> getFastAPIArticle(String link) {
        try {
            return restTemplate.exchange(
                    fastAPICredentials.getUri() + "?url=" + link,
                    GET,
                    null,
                    FastAPIArticleResponse.class
            );
        } catch (HttpClientErrorException e) {
            throw new ArticleNotFoundException();
        }
    }
}
