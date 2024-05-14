package readit.challenge.domain.dto;

public record GetRankMember(
        String name,
        String profile,
        Integer challengeScore,
        Integer rank
) {
    public static GetRankMember of(String name, String profile, Integer challengeScore, Integer rank) {
        return new GetRankMember(name, profile, challengeScore, rank);
    }
}
