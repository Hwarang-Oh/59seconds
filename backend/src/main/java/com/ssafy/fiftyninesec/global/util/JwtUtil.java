package com.ssafy.fiftyninesec.global.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    @Value("${jwt.token.secret-key}")
    private String secretKeyString;
    @Value("${jwt.access.expiration}")
    private long accessExpiration;
    @Value("${jwt.refresh.expiration}")
    private long refreshExpiration;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public String generateAccessToken(Long memberId, String kakaoSub) {
        if (kakaoSub == null) {
            throw new RuntimeException("INVALID_INPUT");
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", memberId);

        Date now = new Date();
        Date validity = new Date(now.getTime() + accessExpiration);

        try {
            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(kakaoSub)
                    .setIssuedAt(now)
                    .setExpiration(validity)
                    .signWith(SignatureAlgorithm.HS256, secretKeyString)
                    .compact();
        } catch (Exception e) {
            throw new RuntimeException("TOKEN_GENERATION_FAILED");
        }
    }

    public String generateRefreshToken(Long memberId, String kakaoSub) {
        if (kakaoSub == null) {
            throw new RuntimeException("INVALID_INPUT");
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", memberId);

        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshExpiration);

        try {
            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(kakaoSub)
                    .setIssuedAt(now)
                    .setExpiration(validity)
                    .signWith(SignatureAlgorithm.HS256, secretKeyString)
                    .compact();
        } catch (Exception e) {
            throw new RuntimeException("TOKEN_GENERATION_FAILED");
        }
    }

    public void addAccessTokenToCookie(HttpServletResponse response, String accessToken) {
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(10 * 60); // 쿠키 만료 시간 10분 (액세스 토큰 만료 시간과 동일)
        response.addCookie(accessTokenCookie);
    }

    public static String getSubFromIdToken(String idToken) {
        try {
            String[] parts = idToken.split("\\.");
            if (parts.length < 2) {
                throw new Exception("TokenErrorCode.ID_TOKEN_FORMAT_ERROR");
            }
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
            Map<String, Object> payloadMap = objectMapper.readValue(payload, Map.class);
            return (String) payloadMap.get("sub");
        } catch (Exception e) {
            throw new RuntimeException("TokenErrorCode.TOKEN_DECODE_FAILED");
        }
    }
}
