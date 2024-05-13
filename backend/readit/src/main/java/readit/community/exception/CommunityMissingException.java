package readit.community.exception;

import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

public class CommunityMissingException extends ReadItException {
    public CommunityMissingException () {
        super(new ErrorCode(BAD_REQUEST, "목록에 없는 커뮤니티입니다."));
    }

}
