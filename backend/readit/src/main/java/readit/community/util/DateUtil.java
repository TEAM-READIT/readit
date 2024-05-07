package readit.community.util;

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

    // todo: 하루에 한 번만 구해서 공용 변수로 사용하는 것으로 변경
    public LocalDateTime[] getCurrentWeek() {
        LocalDate today = LocalDate.now();

        LocalDateTime startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).atStartOfDay();

        LocalDateTime endOfWeek = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)).atStartOfDay()
                .withHour(23)
                .withMinute(59)
                .withSecond(59);

        return new LocalDateTime[] { startOfWeek, endOfWeek };
    }
}
