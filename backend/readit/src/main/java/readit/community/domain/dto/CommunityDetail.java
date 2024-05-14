package readit.community.domain.dto;

import readit.community.domain.entity.Community;
import java.time.LocalDate;

public record CommunityDetail(
        Integer communityId,
        Integer writerId,
        String writerName,
        String writerProfile,
        Integer maxParticipants,
        Integer currentParticipants,
        String categoryName,
        String title,
        String content,
        Integer articleCount,
        Integer hits,
        LocalDate startAt,
        LocalDate endAt
) {

    public static CommunityDetail from(Community community) {

        return new CommunityDetail(
                community.getId(),
                community.getMember().getId(),
                community.getMember().getName(),
                community.getMember().getProfile(),
                community.getMaxParticipants(),
                community.getParticipants().size(),
                community.getCategory().getName(),
                community.getTitle(),
                community.getContent(),
                community.getArticleCount(),
                community.getHits(),
                community.getStartAt(),
                community.getEndAt()
        );
    }
}
