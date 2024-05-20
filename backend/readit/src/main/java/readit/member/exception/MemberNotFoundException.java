package readit.member.exception;

import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

public class MemberNotFoundException extends ReadItException {

    public MemberNotFoundException() {
        super(new ErrorCode(UNAUTHORIZED, "회원을 찾을 수 없습니다!"));
    }
}
