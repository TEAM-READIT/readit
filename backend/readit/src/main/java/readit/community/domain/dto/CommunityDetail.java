package readit.community.domain.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import readit.community.domain.dto.response.GetHotCommunityResponse;
import readit.community.domain.entity.Community;
import readit.member.domain.Member;

@Builder
public record CommunityDetail(
        String writerName,
        String writerProfile,
        Integer maxParticipants,
        Integer currentParticipants,
        String categoryName,
        String title,
        String notice,
        Integer articleCount,
        Integer hits,
        LocalDate startAt,
        LocalDate endAt
) {

    public static CommunityDetail from(Member member, Community community) {
        // 이 부분에서 CommunityDetail 레코드를 빌드합니다.
        return CommunityDetail.builder()
                .writerName(member.getName())
                .writerProfile(member.getProfile())
                .maxParticipants(community.getMaxParticipants())
                .currentParticipants(community.getParticipants().size()) // 현재 참가자 수
                .categoryName(community.getCategory().getName()) // 카테고리 이름
                .title(community.getTitle())
                .notice(community.getNotice())
                .articleCount(community.getArticleCount())
                .hits(community.getHits())
                .startAt(community.getStartAt())
                .endAt(community.getEndAt())
                .build();
    }
}
