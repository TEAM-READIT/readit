package readit.community.domain.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import readit.article.domain.CategoryType;
import readit.community.domain.entity.Community;

@NotNull
public record GetCreateCommunityRequest(
        String title,
        String content,
        String categoryName,
        Integer maxParticipants,
        Integer articleCount,
        LocalDate startAt,
        LocalDate endAt
) {
    public static Community toEntity(GetCreateCommunityRequest getCreateCommunityRequest, Integer memberId){
        return Community.builder()
                .category(CategoryType.getCategoryByKrName(getCreateCommunityRequest.categoryName))
                .writerId(memberId)
                .title(getCreateCommunityRequest.title)
                .content(getCreateCommunityRequest.content)
                .maxParticipants(getCreateCommunityRequest.maxParticipants)
                .startAt(getCreateCommunityRequest.startAt)
                .endAt(getCreateCommunityRequest.endAt)
                .articleCount(getCreateCommunityRequest.articleCount)
                .build();
    }
}