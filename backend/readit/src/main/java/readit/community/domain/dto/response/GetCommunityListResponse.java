package readit.community.domain.dto.response;

import readit.article.dto.Page;
import readit.community.domain.dto.CommunityDetail;
import readit.community.domain.entity.Community;

import java.util.List;

public record GetCommunityListResponse(
        List<CommunityDetail> communityList,
        Boolean hasNext
) {
    public static GetCommunityListResponse from(Page<Community> communityList){
        List<CommunityDetail> communityDetailList = communityList.stream()
                .map(CommunityDetail::from)
                .toList();

        return new GetCommunityListResponse(communityDetailList, communityList.hasNext);
    }
}