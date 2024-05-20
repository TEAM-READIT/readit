package readit.community.domain.dto.response;

import lombok.Builder;
import readit.community.domain.dto.MyCommunityDetail;
import readit.community.domain.entity.Community;

import java.util.List;

@Builder
public record GetMyCommunityResponse(
        List<MyCommunityDetail> communityList
) {
    public static GetMyCommunityResponse from(List<Community> communityList) {
        List<MyCommunityDetail> communityDetailList = communityList.stream()
                .map(MyCommunityDetail::from)
                .toList();
        return new GetMyCommunityResponse(communityDetailList);
    }
}
