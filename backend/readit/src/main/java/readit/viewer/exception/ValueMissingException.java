package readit.viewer.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class ValueMissingException extends ReadItException {
    public ValueMissingException() {
        super(new ErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, "DB에 해당 데이터가 없습니다."));
    }

}
