package readit.common.cache;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CacheType {
    Article("articles", 10, 10000),
    PopularArticles("popularArticles", 10, 100),
    ArticleSearch("articleSearch", 60, 5000),
    PopularCommunity("popular_community", 60, 100),
    PopularSearch("popular_search", 60, 100),
    ChallengeRank("challengeRank", 60, 100);
    private final String cacheName;
    private final int expireAfterWrite;
    private final int maximumSize;

}
