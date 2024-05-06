package readit.community.domain.dto.response;

import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import readit.community.domain.dto.CommunityDetail;
import readit.community.domain.entity.Community;

@Builder
public record GetHotCommunityResponse(
        List<CommunityDetail> communityList
) {

}
