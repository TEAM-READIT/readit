package readit.auth.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class OAuthMemberException extends ReadItException {
    public OAuthMemberException(){
        super(new ErrorCode(HttpStatus.NOT_FOUND, "OAuth Member를 찾을 수 없습니다."));
    }

}