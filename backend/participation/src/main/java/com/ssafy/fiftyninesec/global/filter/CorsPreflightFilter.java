//package com.ssafy.fiftyninesec.global.filter;
//
//import jakarta.servlet.*;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//
//@Component
//public class CorsPreflightFilter implements Filter {
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//            throws IOException, ServletException {
//
//        HttpServletRequest httpRequest = (HttpServletRequest) request;
//        HttpServletResponse httpResponse = (HttpServletResponse) response;
//
//        // OPTIONS 요청일 때 CORS 헤더 설정
//        if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
//            setCorsHeaders(httpResponse);
//            return;
//        }
//
//        // OPTIONS 요청이 아닐 경우, 다음 필터로 넘어감
//        chain.doFilter(request, response);
//    }
//
//    // CORS 헤더를 설정하는 메서드
//    private void setCorsHeaders(HttpServletResponse response) {
//        response.setStatus(HttpServletResponse.SC_OK);
//        response.setHeader("Access-Control-Allow-Origin", "*"); // 허용할 도메인 설정
//        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
//        response.setHeader("Access-Control-Allow-Credentials", "true"); // 필요 시 쿠키 전송 허용
//    }
//}
