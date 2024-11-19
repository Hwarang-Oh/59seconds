package com.ssafy.fiftyninesec.global.filter;

import com.ssafy.fiftyninesec.global.util.JwtUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberIdFilter implements Filter {
     private final JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {


        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // 헤더에서 memberId를 가져와 request attribute에 설정
        String memberId = httpRequest.getHeader("memberId");
        if (memberId != null) {
            httpRequest.setAttribute("memberId", Long.parseLong(memberId));
        }

        Optional<Cookie> accessTokenCookie = Arrays.stream(Optional.ofNullable(httpRequest.getCookies()).orElse(new Cookie[0]))
                 .filter(cookie -> "accessToken".equals(cookie.getName()))
                 .findFirst();

        if (accessTokenCookie.isPresent()) {
         String accessToken = accessTokenCookie.get().getValue();
         //액세스 토큰 검증
         if (jwtUtil.validateToken(accessToken)) {
             Long temp = jwtUtil.getMemberIdFromToken(accessToken);
             httpRequest.setAttribute("memberId", temp);
             chain.doFilter(request, response);
             return; // 성공 시 필터 체인 실행 후 종료
              }
        }
        chain.doFilter(httpRequest, httpResponse);
    }

}
