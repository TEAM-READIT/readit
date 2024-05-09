package readit.challenge.exception;

import org.springframework.http.HttpStatus;
import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

public class TodayChallengeFinishedException extends ReadItException {
    public TodayChallengeFinishedException() {
        super(new ErrorCode(HttpStatus.BAD_REQUEST, "오늘의 챌린지에 이미 참여하였습니다."));
    }
}
