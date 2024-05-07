package readit.community.domain.dto.response;

import readit.community.domain.dto.CommunityDetail;

import java.util.List;

public record GetHotCommunityResponse(
        List<CommunityDetail> communityList
) {
    public static GetHotCommunityResponse from(List<CommunityDetail> communityList) {
        return new GetHotCommunityResponse(communityList);
    }
}
