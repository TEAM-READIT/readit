package readit.article.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;


public class ArticleNotFoundException extends ReadItException {
    public ArticleNotFoundException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "글을 찾을 수 없습니다."));
    }
}
