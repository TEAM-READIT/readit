package readit.common.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import readit.auth.infra.google.config.GoogleCredentials;
import readit.auth.infra.kakao.config.KakaoCredentials;
import readit.auth.infra.naver.config.NaverCredentials;

@Configuration
@EnableConfigurationProperties({
        JwtCredentials.class,
        KakaoCredentials.class,
        NaverCredentials.class,
        GoogleCredentials.class
})
public class AppConfig {
}
