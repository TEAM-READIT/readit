package readit.auth.application.dto;

import readit.member.domain.Member;
import readit.member.domain.MemberType;

public interface OAuthMemberResponse {
    String getEmail();

    String getNickName();

    String getPicture();

    Member toMember();

    MemberType getMemberType();
}
