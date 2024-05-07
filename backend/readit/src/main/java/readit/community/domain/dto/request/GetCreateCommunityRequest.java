package readit.community.domain.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import readit.article.domain.CategoryType;
import readit.community.domain.entity.Community;

import java.time.LocalDate;

@NotNull
public record GetCreateCommunityRequest(
        @NotNull(message = "제목은 Null 일 수 없습니다.")
        @Size(min = 1, max = 50, message = "제목은 1~50자 사이입니다.")
        String title,

        @NotNull(message = "내용은 Null 일 수 없습니다.")
        String content,

        @NotNull(message = "카테고리는 Null 일 수 없습니다.")
        String categoryName,

        @NotNull(message = "최대 정원 수는 Null 일 수 없습니다.")
        @Size(min = 1, max = 8, message = "최대 정원은 8명 이하입니다.")
        Integer maxParticipants,

        @NotNull(message = "최대 정원 수는 Null 일 수 없습니다.")
        Integer articleCount,

        @NotNull(message = "모집 시작 일자는 Null 일 수 없습니다.")
        LocalDate startAt,

        @NotNull(message = "모집 마감 일자는 Null 일 수 없습니다.")
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
