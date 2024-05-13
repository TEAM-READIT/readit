package readit.viewer.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class InvalidAPIResponseException extends ReadItException {
    public InvalidAPIResponseException() {
        super(new ErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, "외부 API에서 원치 않는 응답이 왔습니다."));
    }

}
