package readit.community.exception;

import readit.common.error.ErrorCode;
import readit.common.error.ReadItException;

import static org.springframework.http.HttpStatus.CONFLICT;

public class CommunityFullException  extends ReadItException {
    public CommunityFullException () {
        super(new ErrorCode(CONFLICT, "커뮤니티의 정원이 꽉 찼습니다."));
    }

}
