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
        return CommunityDetailMember.builder()
                .memberId(member.getId())
                .memberName(member.getName())
                .memberProfile(member.getProfile())
                .readCount(readCount)
                .build();
    }
}
