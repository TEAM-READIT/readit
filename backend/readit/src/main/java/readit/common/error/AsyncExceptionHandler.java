package readit.common.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;

import java.lang.reflect.Method;

@Slf4j
public class AsyncExceptionHandler implements AsyncUncaughtExceptionHandler {
    @Override
    public void handleUncaughtException(Throwable ex, Method method, Object... obj) {
        log.error("Exception message : " + ex.getMessage());
        log.error("Method name : " + method.getName());
        for (Object params : obj) {
            log.error("Parameter value : " + params);
        }
    }
}
