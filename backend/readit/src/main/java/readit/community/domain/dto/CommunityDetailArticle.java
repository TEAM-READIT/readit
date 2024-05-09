package readit.community.domain.dto;

import readit.viewer.domain.entity.MemberArticle;
import readit.viewer.exception.ValueMissingException;
import java.util.List;

public record CommunityDetailArticle(
        CommunityDetailMember member,
        ArticleDetail articleDetail
) {

    public static CommunityDetailArticle of(MemberArticle memberArticle, List<CommunityDetailMember> memberList) {
        Integer communityMemberId = memberArticle.getMemberId();

        CommunityDetailMember matchingMember = memberList.stream()
                .filter(member -> member.memberId().equals(communityMemberId))
                .findFirst()
                .orElseThrow(ValueMissingException::new);

        ArticleDetail articleDetail = ArticleDetail.from(memberArticle);

        return new CommunityDetailArticle(matchingMember, articleDetail);
    }
}
