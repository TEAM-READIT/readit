package readit.community.domain.dto.response;

import lombok.Builder;
import readit.community.domain.dto.CommunityDetail;

import java.util.List;

@Builder
public record GetHotCommunityResponse(
        List<CommunityDetail> communityList
) {
    public static GetHotCommunityResponse from(List<CommunityDetail> communityList) {
        return new GetHotCommunityResponse((communityList));
    }
}
