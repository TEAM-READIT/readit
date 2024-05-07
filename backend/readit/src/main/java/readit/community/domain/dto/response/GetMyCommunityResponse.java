package readit.community.domain.dto.response;

import java.util.List;
import lombok.Builder;
import readit.community.domain.dto.MyCommunityDetail;

@Builder
public record GetMyCommunityResponse(
        List<MyCommunityDetail> communityList
) {
}
