package readit.article.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class MemberArticleNotFoundException extends ReadItException {

    public MemberArticleNotFoundException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "읽은 글을 찾을 수 없습니다."));
    }
}
