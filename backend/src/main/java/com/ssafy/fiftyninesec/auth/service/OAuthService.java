package com.ssafy.fiftyninesec.auth.service;

import com.ssafy.fiftyninesec.global.exception.CustomException;
import com.ssafy.fiftyninesec.global.exception.ErrorCode;
import com.ssafy.fiftyninesec.global.util.JwtUtil;
import com.ssafy.fiftyninesec.solution.entity.Member;
import com.ssafy.fiftyninesec.solution.repository.MemberRepository;
import com.ssafy.fiftyninesec.solution.service.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

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
            String tokenRequestUrl = UriComponentsBuilder.fromHttpUrl(tokenUrl)
                    .queryParam("grant_type", "authorization_code")
                    .queryParam("client_id", clientId)
                    .queryParam("redirect_uri", redirectUri)
                    .queryParam("code", code)
                    .queryParam("client_secret", clientSecret)
                    .queryParam("scope", scope)
                    .toUriString();

            Map<String, String> response = restTemplate.postForObject(tokenRequestUrl, null, Map.class);
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

    public void loginOrRegister(Member member,String kakaoSub, HttpServletResponse response) {
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
    }
}
