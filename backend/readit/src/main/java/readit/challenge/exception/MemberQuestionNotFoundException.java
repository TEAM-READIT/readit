package readit.challenge.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class MemberQuestionNotFoundException extends ReadItException {
    public MemberQuestionNotFoundException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "푼 문제가 없습니다."));
    }
}
