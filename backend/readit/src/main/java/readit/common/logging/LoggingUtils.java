package readit.common.logging;

import lombok.extern.slf4j.Slf4j;
import readit.common.error.ReadItException;

@Slf4j
public class LoggingUtils {
    public static void info(String message, Object... data) {
        log.info(message, data);
    }

    public static String getExceptionMessage(String message) {
        if (message == null || message.isBlank()) {
            return "No message provided";
        }
        return message;
    }

    public static void error(Exception exception) {
        String message = getExceptionMessage(exception.getMessage());
        log.error("{}\n", message, exception);
    }

    public static void warn(ReadItException exception) {
        String message = getExceptionMessage(exception.getMessage());
        log.warn("{}\n", message, exception);
    }

}
