package com.ssafy.fiftyninesec.auth.service;

import com.ssafy.fiftyninesec.auth.dto.OAuthResponseDto;
import com.ssafy.fiftyninesec.global.exception.CustomException;
import com.ssafy.fiftyninesec.global.exception.ErrorCode;
import com.ssafy.fiftyninesec.global.util.JwtUtil;
import com.ssafy.fiftyninesec.solution.entity.Member;
import com.ssafy.fiftyninesec.solution.service.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthService {

    private final RestTemplate restTemplate;
    private final JwtUtil jwtUtil;
    private final MemberService memberService;
    private final StringRedisTemplate redisTemplate;

    @Value("${kakao.client.id}")
    private String clientId;

    @Value("${kakao.client.secret}")
    private String clientSecret;

    @Value("${kakao.client.redirect-uri}")
    private String redirectUri;

    @Value("${kakao.auth-url}")
    private String authUrl;

    @Value("${kakao.token-url}")
    private String tokenUrl;

    @Value("${kakao.user-info-url}")
    private String userInfoUrl;

    @Value("${kakao.scope}")
    private String scope;

    public ArrayList<String> getKakaoTokens(String code) {
        try {
            // Header 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            // 요청 파라미터 설정
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "authorization_code");
            params.add("client_id", clientId);
            params.add("redirect_uri", redirectUri);
            params.add("code", code);
            params.add("client_secret", clientSecret);
            params.add("scope", scope);

            // HttpEntity 생성
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

            // 요청 보내기
            ResponseEntity<Map> responseEntity = restTemplate.postForEntity(tokenUrl, request, Map.class);

            // 응답 상태와 바디 로그 출력

            // 응답 처리
            Map<String, String> response = responseEntity.getBody();
            ArrayList<String> tokens = new ArrayList<>();

            if (response != null) {

                if (response.containsKey("access_token")) {
                    tokens.add(response.get("access_token"));
                } else {
                    throw new CustomException(ErrorCode.OAUTH_AUTHENTICATION_FAILED);
                }

                tokens.add(response.getOrDefault("refresh_token", ""));

                tokens.add(response.getOrDefault("id_token", ""));
            } else {
                throw new CustomException(ErrorCode.OAUTH_AUTHENTICATION_FAILED);
            }

            return tokens;
        } catch (Exception e) {
            throw new CustomException(ErrorCode.OAUTH_AUTHENTICATION_FAILED);
        }
    }

    public Map<String, String> generateTokens(Long memberId, String sub) {
        Map<String, String> tokensMap = new HashMap<>();
        String accessToken = jwtUtil.generateAccessToken(memberId, sub);
        tokensMap.put("accessToken", accessToken);
        String refreshToken = jwtUtil.generateRefreshToken(memberId, sub);

        tokensMap.put("refreshToken", refreshToken);
        return tokensMap;
    }

    public OAuthResponseDto loginOrRegister(Member member, String kakaoSub, HttpServletResponse response) {
        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();
        // 회원가입
        if (member == null) {
            member = memberService.registerMember(kakaoSub);
        }
        Map<String, String> tokensMap = generateTokens(member.getId(), kakaoSub);
        String accessToken = tokensMap.get("accessToken");
        String refreshToken = tokensMap.get("refreshToken");

        // Redis에 AccessToken과 RefreshToken 저장
        String accessTokenKey = "accessToken:" + member.getId();
        String refreshTokenKey = "refreshToken:" + member.getId();
        try{
            valueOps.set(accessTokenKey, accessToken, 1, TimeUnit.HOURS);         // AccessToken TTL: 1시간
            valueOps.set(refreshTokenKey, refreshToken, 12, TimeUnit.HOURS);         // RefreshToken TTL: 12시간
        } catch (Exception e) {
            throw new CustomException(ErrorCode.REDIS_CANNOT_SAVE);
        }
        log.info("토큰 저장 성공");
        // 로그인
        jwtUtil.addAccessTokenToCookie(response, accessToken);
        return new OAuthResponseDto(member.getId());
    }
}
