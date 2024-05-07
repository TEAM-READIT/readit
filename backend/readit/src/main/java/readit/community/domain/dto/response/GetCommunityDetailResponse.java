package readit.community.domain.dto.response;

import readit.community.domain.dto.CommunityDetail;
import readit.community.domain.dto.CommunityDetailArticle;
import readit.community.domain.dto.CommunityDetailMember;
import readit.community.domain.dto.SimpChatDto;
import readit.community.domain.entity.Community;
import readit.member.domain.Member;
import java.util.List;

public record GetCommunityDetailResponse(
        CommunityDetail communityDetail,
        String notice,
        Integer myId,
        List<CommunityDetailMember> memberList,
        List<CommunityDetailArticle> articleList,
        List<SimpChatDto> chatList
) {

    public static GetCommunityDetailResponse of(Community community,
                                                Integer memberId,
                                                Member writer,
                                                List<CommunityDetailMember> memberList,
                                                List<CommunityDetailArticle> articleList,
                                                List<SimpChatDto> chatList
                                                ) {

        return new GetCommunityDetailResponse(
                CommunityDetail.of(writer, community),
                community.getNotice(),
                memberId,
                memberList,
                articleList,
                chatList
        );
    }
}
