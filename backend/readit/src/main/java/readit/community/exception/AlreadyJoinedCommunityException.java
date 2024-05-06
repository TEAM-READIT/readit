package readit.community.exception;

import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

import static org.springframework.http.HttpStatus.CONFLICT;

public class AlreadyJoinedCommunityException extends ReadItException {
    public AlreadyJoinedCommunityException () {
        super(new ErrorCode(CONFLICT, "이미 가입한 커뮤니티입니다."));
    }

}
