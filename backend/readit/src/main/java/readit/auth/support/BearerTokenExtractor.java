package readit.auth.support;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import readit.auth.exception.TokenMissingException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BearerTokenExtractor {
    private static final String BEARER_TYPE = "Bearer";

    public static String extract(HttpServletRequest request) {
        String authorization = request.getHeader(AUTHORIZATION);
        validate(authorization);
        return authorization.replace(BEARER_TYPE, "").trim();
    }

    private static void validate(String authorization) {
        if (authorization == null) {
            throw new TokenMissingException();
        }
    }
}
