package readit.community.domain.dto;

import java.time.LocalDate;
import readit.community.domain.entity.Community;
import readit.member.domain.Member;

public record CommunityDetail(
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

    public static CommunityDetail of(Member writer, Community community) {

        return new CommunityDetail(
                writer.getName(),
                writer.getProfile(),
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
