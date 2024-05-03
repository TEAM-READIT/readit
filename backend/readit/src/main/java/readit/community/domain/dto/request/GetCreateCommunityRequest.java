package readit.community.domain.dto.request;

import jakarta.validation.constraints.NotNull;
import readit.article.domain.CategoryType;
import readit.community.domain.entity.Community;

import java.time.LocalDate;

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
                .hits(0)
                .build();
    }
}
