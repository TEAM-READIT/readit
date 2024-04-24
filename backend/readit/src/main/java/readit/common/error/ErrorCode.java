package readit.common.error;

import org.springframework.http.HttpStatus;

public record ErrorCode(HttpStatus status, String message) {
    @Override
    public String toString() {
        return "{\n" +
                "\t\"status\": " + status +
                ",\n\t\"message\": \"" + message + '\"' +
                "\n}";
    }

}
