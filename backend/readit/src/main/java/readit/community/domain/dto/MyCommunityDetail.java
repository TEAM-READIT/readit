package readit.community.domain.dto;

import java.time.LocalDate;
import readit.community.domain.entity.Community;

public record MyCommunityDetail(
        Integer communityId,
        String categoryName,
        String title,
        LocalDate startAt,
        Integer hits,
        String content
) {
    public static MyCommunityDetail from(Community community) {

        return new MyCommunityDetail(
                community.getId(),
                community.getCategory().getName(),
                community.getTitle(),
                community.getStartAt(),
                community.getHits(),
                community.getContent()
        );
    }
}
