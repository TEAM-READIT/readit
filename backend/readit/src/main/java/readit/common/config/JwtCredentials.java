package readit.common.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "jwt")
public class JwtCredentials {
    private final String secretKey;
    private final long accessTokenExpirationTime;
    private final long refreshTokenExpirationTime;
}
