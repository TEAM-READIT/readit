package readit.challenge.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class SolvedAllProblemsException extends ReadItException {

    public SolvedAllProblemsException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "모든 문제를 다 풀었습니다."));
    }
}
