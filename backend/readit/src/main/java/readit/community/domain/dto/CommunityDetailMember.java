package readit.community.domain.dto;

import lombok.Builder;
import readit.member.domain.Member;

@Builder
public record CommunityDetailMember(
        Integer memberId,
        String memberName,
        String memberProfile,
        Integer readCount
) {
    public static CommunityDetailMember of(Member member, Integer readCount) {

        return new CommunityDetailMember(
                member.getId(),
                member.getName(),
                member.getProfile(),
                readCount
        );
    }
}
