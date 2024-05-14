package readit.common.error;

import org.springframework.http.HttpStatus;

public class WebClientSSLException extends ReadItException{

    public WebClientSSLException() {
            super(new ErrorCode(HttpStatus.NOT_ACCEPTABLE, "SSL관련 에러가 발생했습니다."));
    }

}
