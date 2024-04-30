package readit.article.infra;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import readit.article.dto.FastAPIArticleResponse;
import readit.article.exception.ArticleNotFoundException;
import static org.springframework.http.HttpMethod.GET;

@Component
@RequiredArgsConstructor
public class FastAPIClient {

    @Value("${fastAPI.uri}")
    private final String FAST_API_URI;
    private final RestTemplate restTemplate;

    public FastAPIArticleResponse getArticle(String link){
        ResponseEntity<FastAPIArticleResponse> response = getFastAPIArticle(link);
        return response.getBody();
    }

    private ResponseEntity<FastAPIArticleResponse> getFastAPIArticle(String link) {
        try {
            return restTemplate.exchange(
                    FAST_API_URI + "?url=" + link,
                    GET,
                    null,
                    FastAPIArticleResponse.class
            );
        } catch (HttpClientErrorException e) {
            throw new ArticleNotFoundException();
        }
    }
}
