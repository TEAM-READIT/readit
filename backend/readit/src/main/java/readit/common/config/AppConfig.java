package readit.common.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import readit.article.infra.config.FastAPIURI;
import readit.auth.infra.google.config.GoogleCredentials;
import readit.auth.infra.kakao.config.KakaoCredentials;
import readit.auth.infra.naver.config.NaverCredentials;
import readit.viewer.config.GPTCredentials;


@Configuration
@EnableConfigurationProperties({
        JwtCredentials.class,
        KakaoCredentials.class,
        NaverCredentials.class,
        GoogleCredentials.class,
        GPTCredentials.class,
        FastAPIURI.class
})
public class AppConfig {
}
