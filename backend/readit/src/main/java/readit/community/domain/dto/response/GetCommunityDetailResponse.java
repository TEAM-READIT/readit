package readit.community.domain.dto.response;

import lombok.Builder;
import readit.community.domain.dto.CommunityDetailArticle;
import readit.community.domain.dto.CommunityDetailMember;
import readit.community.domain.dto.SimpChatDto;
import readit.community.domain.entity.Chat;
import readit.community.domain.entity.Community;
import readit.member.domain.Member;

import java.time.LocalDate;
import java.util.List;

@Builder
public record GetCommunityDetailResponse(
        String writerName,
        String writerProfile,
        Integer maxParticipants,
        Integer currentParticipants,
        String categoryName,
        String title,
        String notice,
        Integer articleCount,
        Integer hits,
        Integer myId,
        LocalDate endAt,
        List<CommunityDetailMember> memberList,
        List<CommunityDetailArticle> articleList,
        List<SimpChatDto> chatList
) {
    public static GetCommunityDetailResponse of(Community community,
                                                Integer memberId,
                                                Member writer,
                                                Integer currentParticipants,
                                                List<CommunityDetailMember> memberList,
                                                List<CommunityDetailArticle> articleList,
                                                List<SimpChatDto> chatList
                                                ) {
        return GetCommunityDetailResponse.builder()
                .writerName(writer.getName())
                .writerProfile(writer.getProfile())
                .maxParticipants(community.getMaxParticipants())
                .currentParticipants(currentParticipants)
                .categoryName(community.getCategory().getName())
                .title(community.getTitle())
                .notice(community.getNotice())
                .articleCount(community.getArticleCount())
                .hits(community.getHits())
                .myId(memberId)
                .endAt(community.getEndAt())
                .memberList(memberList)
                .articleList(articleList)
                .chatList(chatList)
                .build();
    }
}
