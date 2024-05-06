package readit.auth.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;
import readit.auth.application.dto.OAuthMemberResponse;
import readit.auth.domain.RefreshToken;
import readit.auth.domain.repository.RefreshTokenRepository;
import readit.auth.dto.TokenDto;
import readit.auth.exception.OAuthMemberException;
import readit.auth.support.JwtProvider;
import readit.member.domain.Member;
import readit.member.domain.repository.MemberRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public Mono<TokenDto> login(Mono<OAuthMemberResponse> oAuthMemberResponseMono) {
        return oAuthMemberResponseMono.flatMap(oAuthMemberResponse -> {
            if (oAuthMemberResponse == null) {
                return Mono.error(new OAuthMemberException());
            }
            return Mono.fromCallable(() -> memberRepository.findByEmailAndMemberType(oAuthMemberResponse.getEmail(), oAuthMemberResponse.getMemberType())
                            .orElseGet(() -> memberRepository.save(oAuthMemberResponse.toMember())))
                    .flatMap(member -> Mono.just(createTokens(member.getId())));
        });
    }

    private TokenDto createTokens(Integer memberId) {
        String accessToken = jwtProvider.createAccessToken(memberId);
        String refreshToken = jwtProvider.createRefreshToken();

        refreshTokenRepository.deleteByMemberId(memberId);
        refreshTokenRepository.save(new RefreshToken(memberId, refreshToken));

        return TokenDto.of(accessToken, refreshToken);
    }

    public String renewAccessTokenBy(String refreshToken) {
        jwtProvider.validateParseJws(refreshToken);
        RefreshToken saveRefreshToken = refreshTokenRepository.getByToken(refreshToken);
        Integer memberId = saveRefreshToken.getMemberId();

        return jwtProvider.createAccessToken(memberId);
    }

    public void logout(Integer memberId) {
        refreshTokenRepository.deleteByMemberId(memberId);
    }
}
