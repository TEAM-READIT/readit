package readit.community.exception;

import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

public class DeletionFailedException extends ReadItException {
    public DeletionFailedException () {
        super(new ErrorCode(BAD_REQUEST, "가입한 커뮤니티가 아닙니다."));
    }

}
