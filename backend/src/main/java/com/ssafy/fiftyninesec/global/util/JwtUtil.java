package com.ssafy.fiftyninesec.global.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.fiftyninesec.global.exception.CustomException;
import com.ssafy.fiftyninesec.global.exception.ErrorCode;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class JwtUtil {

    @Value("${jwt.token.secret-key}")
    private String secretKeyString;
    @Value("${jwt.access.expiration}")
    private long accessExpiration;
    @Value("${jwt.refresh.expiration}")
    private long refreshExpiration;

    public static final ObjectMapper objectMapper = new ObjectMapper();

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
}
