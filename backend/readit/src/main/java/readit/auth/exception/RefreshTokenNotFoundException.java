package readit.auth.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class RefreshTokenNotFoundException extends ReadItException {
    public RefreshTokenNotFoundException(){
        super(new ErrorCode(HttpStatus.UNAUTHORIZED, "존재하지 않는 리프레시 토큰입니다."));
    }

}
