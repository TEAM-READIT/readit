package readit.auth.support;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import readit.auth.exception.TokenMissingException;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ReadItTokenExtractor {
    private static String header = "Refresh";

    public static String extract(HttpServletRequest request) {
        String authorization = request.getHeader(header);
        validate(authorization);
        return authorization.trim();
    }

    private static void validate(String authorization) {
        if(authorization == null){
            throw new TokenMissingException();
        }
    }
}
