package readit.auth.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;


public class TokenMissingException extends ReadItException {
   public TokenMissingException(){
       super(new ErrorCode(HttpStatus.UNAUTHORIZED, "토큰이 필요합니다."));
   }
}
