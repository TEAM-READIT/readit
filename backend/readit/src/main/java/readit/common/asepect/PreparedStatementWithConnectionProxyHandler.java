package readit.common.asepect;

import lombok.RequiredArgsConstructor;
import org.springframework.web.context.request.RequestContextHolder;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

@RequiredArgsConstructor
public class PreparedStatementWithConnectionProxyHandler implements InvocationHandler {
    private final Object connection;
    private final ApiQueryCounter apiQueryCounter;

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        countQuery(method);
        return method.invoke(connection, args);
    }

    private void countQuery(Method method) {
        if (isPrepareStatement(method) && isRequest()){
            apiQueryCounter.increaseCount();
        }
    }

    private boolean isRequest() {
        return RequestContextHolder.getRequestAttributes() != null;
    }

    private boolean isPrepareStatement(Method method) {
        return method.getName().equals("prepareStatement");
    }
}
