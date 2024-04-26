package readit.viewer.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class JsonParsingException extends ReadItException {
    public JsonParsingException() {
        super(new ErrorCode(HttpStatus.INTERNAL_SERVER_ERROR, "JSON 형식에 오류가 있습니다."));
    }

}
