package readit.common.cache;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CacheType {
    Article("articles", 10, 10000),
    PopularArticles("popularArticles", 10, 30),
    ArticleSearch("articleSearch", 5, 5000),
    PopularCommunity("popular_community", 10, 30),
    PopularSearch("popular_search", 10, 30);

    private final String cacheName;
    private final int expireAfterWrite;
    private final int maximumSize;

}
