package readit.auth.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;


public class TokenExpiredException extends ReadItException {
    public TokenExpiredException() {
        super(new ErrorCode(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."));
    }
}
