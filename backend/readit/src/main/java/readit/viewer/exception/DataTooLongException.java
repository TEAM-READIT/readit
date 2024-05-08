package readit.viewer.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class DataTooLongException extends ReadItException {
    public DataTooLongException() {
        super(new ErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, "데이터가 너무 깁니다."));
    }
}
