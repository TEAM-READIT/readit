package readit.community.domain.dto;

public record CommunityDetailArticle(
        CommunityDetailMember member,
        ArticleDetail articleDetail
) {
    public static CommunityDetailArticle of(CommunityDetailMember member,
                                            ArticleDetail articleDetail) {

        return new CommunityDetailArticle(
                member,
                articleDetail
        );
    }
}
