package readit.community.domain.dto;

import lombok.Builder;
import readit.viewer.domain.entity.MemberArticle;

@Builder
public record CommunityDetailArticle(
        CommunityDetailMember member,
        MemberArticle memberArticle
) {
    public static CommunityDetailArticle of(CommunityDetailMember member,
                                            MemberArticle memberArticle) {
        return CommunityDetailArticle.builder()
                .member(member)
                .memberArticle(memberArticle)
                .build();
    }
}
