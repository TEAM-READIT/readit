package readit.challenge.domain.dto;

public record GetRankMember(
        String name,
        String profile
) {
    public static GetRankMember of(String name,String profile){
        return new GetRankMember(name,profile);
    }
}
