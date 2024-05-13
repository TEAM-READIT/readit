package readit.auth.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class TokenInvalidException extends ReadItException {
    public TokenInvalidException() {
        super(new ErrorCode(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰임"));
    }
}
