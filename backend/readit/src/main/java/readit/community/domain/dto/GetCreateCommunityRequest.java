package readit.community.domain.dto;

import java.time.LocalDate;

public record GetCreateCommunityRequest(
        String title,
        String content,
        String categoryName,
        Integer maxParticipants,
        LocalDate startDate,
        LocalDate endDate
) {

}
