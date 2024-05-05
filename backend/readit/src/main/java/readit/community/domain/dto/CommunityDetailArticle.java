package readit.community.domain.dto;

import lombok.Builder;
import readit.viewer.domain.entity.MemberArticle;

@Builder
public record CommunityDetailArticle(
        CommunityDetailMember member,
        ArticleDetail articleDetail
) {
    public static CommunityDetailArticle of(CommunityDetailMember member,
                                            ArticleDetail articleDetail) {
        return CommunityDetailArticle.builder()
                .member(member)
                .articleDetail(articleDetail)
                .build();
    }
}
