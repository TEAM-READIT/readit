package readit.community.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;

@Slf4j
@Component
@RequiredArgsConstructor
public class DateUtil {
    public static LocalDateTime startOfWeek;
    public static LocalDateTime endOfWeek;

    @PostConstruct
    @Scheduled(cron = "0 0 0 * * ?")
    public void getCurrentWeek() {
        LocalDate today = LocalDate.now();
        startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY))
                .atStartOfDay();
        endOfWeek = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY))
                .atStartOfDay()
                .withHour(23)
                .withMinute(59)
                .withSecond(59);
        log.info(startOfWeek.toString());
        log.info(endOfWeek.toString());
    }
}
