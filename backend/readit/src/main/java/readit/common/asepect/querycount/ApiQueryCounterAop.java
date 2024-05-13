package readit.common.asepect.querycount;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.lang.reflect.Proxy;

@Component
@Aspect
@RequiredArgsConstructor
public class ApiQueryCounterAop {
    private final ApiQueryCounter apiQueryCounter;

    @Around("execution(* javax.sql.DataSource.getConnection())")
    public Object getConnection(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object connection = proceedingJoinPoint.proceed();
        return Proxy.newProxyInstance(
                connection.getClass().getClassLoader(),
                connection.getClass().getInterfaces(),
                new PreparedStatementWithConnectionProxyHandler(connection, apiQueryCounter)
        );
    }
}
