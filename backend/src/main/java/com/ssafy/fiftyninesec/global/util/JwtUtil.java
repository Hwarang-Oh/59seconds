package com.ssafy.fiftyninesec.global.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.fiftyninesec.global.exception.CustomException;
import com.ssafy.fiftyninesec.global.exception.ErrorCode;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    @Value("${jwt.token.secret-key}")
    private String secretKeyString;
    @Value("${jwt.access.expiration}")
    private long accessExpiration;
    @Value("${jwt.refresh.expiration}")
    private long refreshExpiration;

    private static final ObjectMapper objectMapper = new ObjectMapper();
    private final StringRedisTemplate redisTemplate;

    public String generateAccessToken(Long memberId, String kakaoSub) {
        if (kakaoSub == null) {
            throw new CustomException(ErrorCode.KAKAOSUB_NOT_FOUND);
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", memberId);

        Date now = new Date();
        Date validity = new Date(now.getTime() + accessExpiration * 1000); // 초 단위를 밀리초로 변환

        try {
            SecretKey secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes(StandardCharsets.UTF_8));

            String token = Jwts.builder()
                    .setClaims(claims)
                    .setSubject(kakaoSub)
                    .setIssuedAt(now)
                    .setExpiration(validity)
                    .signWith(secretKey, SignatureAlgorithm.HS256)
                    .compact();

            return token;
        } catch (Exception e) {
            throw new CustomException(ErrorCode.TOKEN_CANNOT_CREATE);
        }
    }

    public String generateRefreshToken(Long memberId, String kakaoSub) {
        if (kakaoSub == null) {
            throw new CustomException(ErrorCode.KAKAOSUB_NOT_FOUND);
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", memberId);

        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshExpiration * 1000); // 초 단위를 밀리초로 변환

        try {
            SecretKey secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes(StandardCharsets.UTF_8));

            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(kakaoSub)
                    .setIssuedAt(now)
                    .setExpiration(validity)
                    .signWith(secretKey, SignatureAlgorithm.HS256)
                    .compact();
        } catch (Exception e) {
            throw new CustomException(ErrorCode.TOKEN_CANNOT_CREATE);
        }
    }

    public void addAccessTokenToCookie(HttpServletResponse response, String accessToken) {
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(60 * 60); // 쿠키 만료 시간 60분 (액세스 토큰 만료 시간과 동일)
        response.addCookie(accessTokenCookie);
    }

    public void addRefreshTokenIdToCookie(HttpServletResponse response, String refreshTokenId) {
        Cookie refreshTokenIdCookie = new Cookie("refreshTokenId", refreshTokenId);
        refreshTokenIdCookie.setHttpOnly(true);
        refreshTokenIdCookie.setSecure(true);
        refreshTokenIdCookie.setPath("/");
        refreshTokenIdCookie.setMaxAge(12 * 60 * 60); // 12시간
        response.addCookie(refreshTokenIdCookie);
    }

    public boolean validateToken(String token) {
        try {
            SecretKey secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes(StandardCharsets.UTF_8));

            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token); // 토큰 검증
            return true;
        } catch (ExpiredJwtException e) {
            log.error("토큰이 만료되었습니다: {}", e.getMessage());
            throw new CustomException(ErrorCode.TOKEN_EXPIRED);
        } catch (JwtException | IllegalArgumentException e) {
            log.error("토큰이 유효하지 않습니다: {}", e.getMessage());
            throw new CustomException(ErrorCode.TOKEN_INVALID);
        }
    }

    public static String getSubFromIdToken(String idToken) {
        try {
            String[] parts = idToken.split("\\.");
            if (parts.length < 2) {
                throw new CustomException(ErrorCode.OAUTH_AUTHENTICATION_FAILED);
            }
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
            Map<String, Object> payloadMap = objectMapper.readValue(payload, Map.class);
            return (String) payloadMap.get("sub");
        } catch (Exception e) {
            throw new CustomException(ErrorCode.OAUTH_AUTHENTICATION_FAILED);
        }
    }

    public String getSubFromToken(String token) {
        try {
            SecretKey secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes(StandardCharsets.UTF_8));

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject(); // 표준 필드 sub에서 가져오기
        } catch (Exception e) {
            log.error("토큰에서 sub를 추출할 수 없습니다: {}", e.getMessage());
            throw new CustomException(ErrorCode.TOKEN_INVALID);
        }
    }
    public Long getMemberIdFromToken(String token) {
        try {
            SecretKey secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes(StandardCharsets.UTF_8));

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.get("memberId", Long.class);
        } catch (Exception e) {
            log.error("토큰에서 memberId를 추출할 수 없습니다: {}", e.getMessage());
            throw new CustomException(ErrorCode.TOKEN_INVALID);
        }
    }

    public String reissueAccessToken(String refreshTokenId, String storedRefreshToken) {
        if (!validateToken(storedRefreshToken)) {
            throw new CustomException(ErrorCode.TOKEN_INVALID);
        }

        try {
            SecretKey secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes(StandardCharsets.UTF_8));

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(storedRefreshToken)
                    .getBody();

            Long memberId = claims.get("memberId", Long.class);
            String kakaoSub = claims.getSubject();


            // 새로운 액세스 토큰 발급
            String newAccessToken = generateAccessToken(memberId, kakaoSub);

            // 새로운 리프레시 토큰 발급
            String newRefreshToken = generateRefreshToken(memberId, kakaoSub);

            // Redis에 새로운 리프레시 토큰 저장
            String newRefreshTokenId = UUID.randomUUID().toString();
            redisTemplate.delete("refreshTokenId:" + memberId + ":" + refreshTokenId);
            redisTemplate.opsForValue().set("refreshTokenId:" + newRefreshTokenId, newRefreshToken, refreshExpiration, TimeUnit.SECONDS);

            return newAccessToken;
        } catch (Exception e) {
            log.error("토큰 재발급 중 오류 발생: {}", e.getMessage());
            throw new CustomException(ErrorCode.TOKEN_CANNOT_CREATE);
        }
    }

    public void deleteCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // 즉시 만료
        response.addCookie(cookie);
    }

}
