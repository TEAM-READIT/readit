package readit.community.domain.dto.response;

import readit.community.domain.dto.CommunityDetail;
import readit.community.domain.dto.CommunityDetailArticle;
import readit.community.domain.dto.CommunityDetailMember;
import readit.community.domain.dto.SimpChat;
import readit.community.domain.entity.Chat;
import readit.community.domain.entity.Community;
import readit.member.domain.Member;
import readit.viewer.domain.entity.MemberArticle;

import java.util.List;

public record GetCommunityDetailResponse(
        CommunityDetail communityDetail,
        String notice,
        Integer myId,
        List<CommunityDetailMember> memberList,
        List<CommunityDetailArticle> articleList,
        List<SimpChat> chatList
) {

    public static GetCommunityDetailResponse of(Community community,
                                                Integer memberId,
                                                Member writer,
                                                List<CommunityDetailMember> memberList,
                                                List<MemberArticle> memberArticles,
                                                List<Chat> chatList
                                                ) {

        List<CommunityDetailArticle> articleList = memberArticles.stream()
                .map(memberArticle -> CommunityDetailArticle.of(memberArticle, memberList))
                .toList();

        List<SimpChat> simpChatList = chatList.stream()
                .map(SimpChat::from).toList();

        return new GetCommunityDetailResponse(
                CommunityDetail.from(community),
                community.getNotice(),
                memberId,
                memberList,
                articleList,
                simpChatList
        );
    }
}
