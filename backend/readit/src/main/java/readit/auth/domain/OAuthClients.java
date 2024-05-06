package readit.auth.domain;

import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import readit.auth.application.dto.OAuthMemberResponse;
import readit.member.domain.MemberType;

import java.util.EnumMap;
import java.util.Map;
import java.util.Set;

@Component
public class OAuthClients {
    Map<MemberType, OAuthClient> values = new EnumMap<>(MemberType.class);

    public OAuthClients(Set<OAuthClient> clients) {
        clients.forEach(client -> values.put(client.getMemberType(), client));
    }

    public Mono<OAuthMemberResponse> request(String authCode, String redirectUri, String provider) {
        MemberType memberType = MemberType.valueOf(provider);
        OAuthClient oAuthClient = values.get(memberType);
        return oAuthClient.request(authCode, redirectUri);
    }
}
