package readit.common.error;

import lombok.Getter;

@Getter
public class ReadItException extends RuntimeException{
    private final ErrorCode errorCode;

    public ReadItException(ErrorCode errorCode) {
        super(errorCode.message());
        this.errorCode = errorCode;
    }
}
