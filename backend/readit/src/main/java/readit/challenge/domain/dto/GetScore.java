package readit.challenge.domain.dto;

import java.time.LocalDate;
import java.util.Date;

public record GetScore(
        LocalDate date,
        Integer score
) {
    public static GetScore of(LocalDate date, Integer score) {
        return new GetScore(date, score);
    }
}
