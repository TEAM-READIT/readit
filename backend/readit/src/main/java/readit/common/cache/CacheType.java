package readit.common.cache;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CacheType {
    Article("articles", 10, 10000),
    PopularArticles("popularArticles", 10, 30),
    ArticleSearch("articleSearch", 5, 5000);

    private final String cacheName;
    private final int expireAfterWrite;
    private final int maximumSize;

}
