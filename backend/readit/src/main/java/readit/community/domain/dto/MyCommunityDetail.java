package readit.community.domain.dto;

import java.time.LocalDate;
import lombok.Builder;
import readit.community.domain.entity.Community;

@Builder
public record MyCommunityDetail(
        Integer communityId,
        String categoryName,
        String title,
        LocalDate startAt,
        Integer hits,
        String content
) {
    public static MyCommunityDetail from(Community community) {
        return MyCommunityDetail.builder()
                .communityId(community.getId())
                .categoryName(community.getCategory().getName())
                .title(community.getTitle())
                .startAt(community.getStartAt())
                .hits(community.getHits())
                .content(community.getContent())
                .build();
    }
}
