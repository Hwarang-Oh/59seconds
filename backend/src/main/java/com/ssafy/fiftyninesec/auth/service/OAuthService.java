package com.ssafy.fiftyninesec.auth.service;

import com.ssafy.fiftyninesec.global.util.JwtUtil;
import com.ssafy.fiftyninesec.solution.entity.Member;
import com.ssafy.fiftyninesec.solution.repository.MemberRepository;
import com.ssafy.fiftyninesec.solution.service.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuthService {

    private final RestTemplate restTemplate;
    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    private final MemberService memberService;

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
                    .toUriString();

            Map<String, String> response = restTemplate.postForObject(tokenRequestUrl, null, Map.class);
            ArrayList<String> tokens = new ArrayList<>();
            if (response != null) {
                if (response.containsKey("access_token")) {
                    tokens.add(response.get("access_token"));
                } else {
                    throw new Exception("OAUTH2_AUTHENTICATION_FAILED");
                }

                tokens.add(response.getOrDefault("refresh_token", ""));
                tokens.add(response.getOrDefault("id_token", ""));
            } else {
                throw new Exception("OAUTH2_AUTHENTICATION_FAILED");
            }

            return tokens;
        } catch (Exception e) {
            throw new RuntimeException("OAUTH2_AUTHENTICATION_FAILED");
        }
    }

    public Map<String, String> generateTokens(Long memberId, String sub) {
        String accessToken = jwtUtil.generateAccessToken(memberId, sub);
        String refreshToken = jwtUtil.generateRefreshToken(memberId, sub);
        Map<String, String> tokensMap = new HashMap<>();
        tokensMap.put("accessToken", accessToken);
        tokensMap.put("refreshToken", refreshToken);
        return tokensMap;
    }

    public void loginOrRegister(Member member,String kakaoSub, HttpServletResponse response) {
        /* member status에 따라 탈퇴 회원 확인 로직
        if(member != null && member.getStatus() == Status.SUSPEND){
            throw new BaseException(MemberErrorCode.SUSPENDED_MEMBER);
        }

        if (member != null && member.getStatus() == Status.ACTIVE) {
         */

        // 로그인 로직
        if(member != null) {
            Long memberId = member.getId();
            Map<String, String> tokensMap = generateTokens(memberId, kakaoSub);
            String accessToken = tokensMap.get("accessToken");
            jwtUtil.addAccessTokenToCookie(response, accessToken);

            return;
        }

        /* 회원가입 로직
        멤버가 null 이 아니면 회원가입을 진행해야 한다. 유저는 이 과정을 느낄 수 없게 처리한다.
         유저의 기본 정보만을 가지고 회원가입 진행
         */
        memberService.registerMember(kakaoSub);
    }
}
