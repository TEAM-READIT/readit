package readit.article.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;


public class CategoryNotFoundException extends ReadItException {
    public CategoryNotFoundException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "카테고리를 찾을 수 없습니다."));
    }
}
