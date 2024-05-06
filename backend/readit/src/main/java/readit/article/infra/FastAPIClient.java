package readit.article.infra;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import readit.article.dto.response.FastAPIArticleResponse;
import readit.article.exception.ArticleNotFoundException;
import readit.article.infra.config.FastAPIURI;


@Component
@RequiredArgsConstructor
public class FastAPIClient {

    private final FastAPIURI FAST_API_URI;
    private final WebClient webClient;

    public FastAPIArticleResponse getArticle(String link){
        return getFastAPIArticle(link)
                .block();
    }

    private Mono<FastAPIArticleResponse> getFastAPIArticle(String link) {
        return webClient.get()
                .uri(FAST_API_URI + "?url=" + link)
                .retrieve()
                .bodyToMono(FastAPIArticleResponse.class)
                .onErrorMap(Exception.class, ex -> new ArticleNotFoundException());
    }
}
