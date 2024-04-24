package readit.auth.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import readit.auth.application.AuthServiceFacade;
import readit.auth.dto.*;
import readit.auth.infra.kakao.config.KakaoCredentials;
import readit.auth.support.JwtProvider;
import readit.auth.support.ReadItTokenExtractor;
import readit.member.application.MemberQueryService;
import readit.member.domain.Member;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "OAuth 2.0", description = "로그인 API")
public class AuthController {
    private final JwtProvider jwtProvider;
    private final AuthServiceFacade authServiceFacade;
    private final MemberQueryService memberQueryService;
    private final KakaoCredentials kaKaoCredentials;
    @Operation(summary = "로그인", description = "로그인")
    @PostMapping("/login/{provider}")
    public ResponseEntity<LoginResponse> login(
            @Parameter(description = "인가 코드", required = true, schema = @Schema(type = "string")) @RequestParam("code") String authCode,
            @PathVariable String provider
    ) {
        TokenDto tokenDto = authServiceFacade.login(authCode, kaKaoCredentials.getRedirectUri(), provider);

        String memberId = jwtProvider.getPayload(tokenDto.accessToken());
        Member member = memberQueryService.findById(Integer.valueOf(memberId));

        return ResponseEntity.ok(LoginResponse.of(tokenDto, member));
    }

    @Operation(summary = "토큰 갱신", description = "액세스 토큰 갱신")
    @GetMapping("/refresh")
    public ResponseEntity<AccessTokenResponse> renewTokens(HttpServletRequest request) {
        String refreshToken = ReadItTokenExtractor.extract(request);
        String accessToken = authServiceFacade.renewAccessTokenBy(refreshToken);
        return ResponseEntity.ok(AccessTokenResponse.from(accessToken));
    }

    @Operation(summary = "로그아웃", description = "로그아웃 처리")
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@Parameter(description = "인증 정보", required = true, schema = @Schema(implementation = AuthCredentials.class)) @Auth AuthCredentials authCredentials){
        authServiceFacade.logout(authCredentials.id());
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "사용자 상세 정보 조회", description = "사용자의 상세 정보를 조회")
    @GetMapping("/search")
    public ResponseEntity<AuthResponse> getMemberDetail(@Auth AuthCredentials authCredentials){
        Member member = memberQueryService.findById(authCredentials.id());
        return ResponseEntity.ok(AuthResponse.of(member));
    }


}
