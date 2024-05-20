package readit.auth.infra.google.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "oauth.google")
public class GoogleCredentials {
    private final String clientId;
    private final String redirectUri;
    private final String clientSecret;
}
