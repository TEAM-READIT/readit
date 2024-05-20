package readit.article.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;


public class LinkNotExistException extends ReadItException {
    public LinkNotExistException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "링크가 존재하지 않습니다."));
    }
}
