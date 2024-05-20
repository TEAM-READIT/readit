package readit.viewer.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class APIResponseMissingException extends ReadItException {
    public APIResponseMissingException() {
        super(new ErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, "외부 API 응답이 없습니다."));
    }
}
