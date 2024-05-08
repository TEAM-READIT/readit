package readit.challenge.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;


public class ProblemNotFoundException extends ReadItException {
    public ProblemNotFoundException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "문제를 찾을 수 없습니다."));
    }
}
