package readit.viewer.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "openai")
public class GPTCredentials {
    private final String model;
    private final String secretKey;
}
