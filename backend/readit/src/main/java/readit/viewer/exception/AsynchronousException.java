package readit.viewer.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class AsynchronousException extends ReadItException {
    public AsynchronousException() {
        super(new ErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, "비동기처리 응답이 오지 않았습니다."));
    }

}
