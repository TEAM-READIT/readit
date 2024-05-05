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

    // todo: 하루에 한 번 구하기
    @Scheduled()
    public LocalDateTime[] getCurrentWeek() {
        // 오늘 날짜 가져오기
        LocalDate today = LocalDate.now();

        // 이번 주의 시작일(월요일) 계산
        LocalDateTime startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).atStartOfDay();

        // 이번 주의 종료일(일요일) 계산
        LocalDateTime endOfWeek = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)).atStartOfDay()
                .withHour(23) // 시간 설정: 23시
                .withMinute(59) // 분 설정: 59분
                .withSecond(59); // 초 설정: 59초;

        // 결과를 LocalDate 배열로 반환
        return new LocalDateTime[] { startOfWeek, endOfWeek };
    }
}
