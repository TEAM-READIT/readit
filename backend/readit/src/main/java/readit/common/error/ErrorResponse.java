package readit.common.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import org.springframework.http.HttpStatus;

public record ErrorResponse(
        int status,
        String message

) {
    @Override
    public String toString() {
        return "{\n" +
                "\t\"status\": " + status +
                ",\n\t\"message\": \"" + message + '\"' +
                "\n}";
    }

}
