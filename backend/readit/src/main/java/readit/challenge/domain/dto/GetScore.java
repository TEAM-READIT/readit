package readit.challenge.domain.dto;

import java.time.LocalDate;

public record GetScore(
        LocalDate date,
        Integer score
) {
    public static GetScore of(LocalDate date, Integer score) {
        return new GetScore(date, score);
    }
}
