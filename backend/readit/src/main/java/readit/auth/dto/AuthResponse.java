package readit.auth.dto;

import readit.member.domain.Member;

public record AuthResponse(
        Integer id,
        String name,
        String email,
        String profileImageUrl
) {
    public static AuthResponse of(Member member) {
        return new AuthResponse(
                member.getId(),
                member.getName(),
                member.getEmail(),
                member.getProfile()
        );
    }
}
