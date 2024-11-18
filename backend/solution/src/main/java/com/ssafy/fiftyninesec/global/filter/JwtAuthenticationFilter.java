// package com.ssafy.fiftyninesec.global.filter;

// import com.ssafy.fiftyninesec.global.util.JwtUtil;
// import jakarta.servlet.*;
// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import lombok.RequiredArgsConstructor;
// import org.springframework.data.redis.core.StringRedisTemplate;
// import org.springframework.stereotype.Component;

// import java.io.IOException;
// import java.util.Arrays;
// import java.util.List;
// import java.util.Optional;

// @Component
// @RequiredArgsConstructor
// public class JwtAuthenticationFilter implements Filter {
//     private final JwtUtil jwtUtil;
//     private final StringRedisTemplate redisTemplate;

//     // 인증 제외 URL 리스트
//     private static final List<String> EXCLUDED_URLS = Arrays.asList(
//             "/api/v2/oauth2/kakao/callback", // 로그인 요청
//             "/api/v2/public/**", // 공개 API
//             "/api/v2/static/**", // 정적 파일
//             "/api/v2/rooms/**",
//             "/api/v2/search/**"
//     );

//     @Override
//     public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//         HttpServletRequest httpRequest = (HttpServletRequest) request;
//         HttpServletResponse httpResponse = (HttpServletResponse) response;

//         String requestUri = httpRequest.getRequestURI();

//         // 인증 제외 URL은 필터 건너뛰기
//         if (isExcludedUrl(requestUri)) {
//             chain.doFilter(request, response);
//             return;
//         }

//         try {
//             Optional<Cookie> accessTokenCookie = Arrays.stream(Optional.ofNullable(httpRequest.getCookies()).orElse(new Cookie[0]))
//                 .filter(cookie -> "accessToken".equals(cookie.getName()))
//                 .findFirst();

//             if (accessTokenCookie.isPresent()) {
//                 String accessToken = accessTokenCookie.get().getValue();
//                 //액세스 토큰 검증
//                 if (jwtUtil.validateToken(accessToken)) {
//                     Long memberId = jwtUtil.getMemberIdFromToken(accessToken);
//                     httpRequest.setAttribute("memberId", memberId);
//                     chain.doFilter(request, response);
//                     return; // 성공 시 필터 체인 실행 후 종료
//                 }
//             }
//             // 액세스 토큰 만료 되면 리프레시 토큰으로 재발급
//             String newAccessToken = handleExpiredAccessToken(httpRequest, httpResponse);
//             if (newAccessToken != null) {
//                 Long memberId = jwtUtil.getMemberIdFromToken(newAccessToken);
//                 httpRequest.setAttribute("memberId", memberId);
//                 chain.doFilter(request, response);
//                 return;
//             }
//             if (!httpResponse.isCommitted()) {
//                 httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "AccessToken이 유효하지 않거나 만료되었습니다.");
//             }
//         } catch (Exception e) {
//             if (!httpResponse.isCommitted()) {
//                 httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "인증에 실패했습니다.");
//             }
//         }
//     }
//     // 인증 제외 URL 체크
//     private boolean isExcludedUrl(String requestUri) {
//         return EXCLUDED_URLS.stream().anyMatch(requestUri::startsWith);
//     }

//     private String handleExpiredAccessToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
//         Optional<Cookie> refreshTokenIdCookie = Arrays.stream(Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]))
//                 .filter(cookie -> "refreshTokenId".equals(cookie.getName()))
//                 .findFirst();

//         if (refreshTokenIdCookie.isPresent()) {
//             String refreshTokenId = refreshTokenIdCookie.get().getValue();
//             String storedRefreshToken = redisTemplate.opsForValue().get("refreshTokenId:" + refreshTokenId);

//             if (storedRefreshToken != null && jwtUtil.validateToken(storedRefreshToken)) {
//                 String newAccessToken = jwtUtil.reissueAccessToken(refreshTokenId, storedRefreshToken);

//                 jwtUtil.addAccessTokenToCookie(response, newAccessToken);
//                 return newAccessToken;
//             }

//         }
//         if (!response.isCommitted()) {
//             response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "refreshToken이 없습니다.");
//         }
//         return null;
//     }
// }
