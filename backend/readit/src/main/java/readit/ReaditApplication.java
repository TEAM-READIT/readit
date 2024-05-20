package readit;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@OpenAPIDefinition(
        servers={
                @Server(url="https://readit.store/api/readit", description="Deploy Server URL"),
                @Server(url="http://k10a705.p.ssafy.io:8080/readit", description="Develop Server URL"),
                @Server(url="http://localhost:8080/readit", description="Local Server URL")
        }
)
@SpringBootApplication
//@EnableScheduling
public class ReaditApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReaditApplication.class, args);
    }

}
