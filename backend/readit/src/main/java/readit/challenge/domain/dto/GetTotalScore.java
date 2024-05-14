package readit.challenge.domain.dto;

import java.time.LocalDate;

public record GetTotalScore(
        LocalDate date,
        Double score
) {
    public static GetTotalScore of(LocalDate date, Double score) {
        return new GetTotalScore(date, score);
    }
}
