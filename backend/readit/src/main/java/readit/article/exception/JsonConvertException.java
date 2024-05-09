package readit.article.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;


public class JsonConvertException extends ReadItException {
    public JsonConvertException() {
        super(new ErrorCode(HttpStatus.EXPECTATION_FAILED, "JSON변환에 실패했습니다."));
    }
}
