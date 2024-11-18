// package com.ssafy.fiftyninesec.global.filter;

// import jakarta.servlet.*;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.stereotype.Component;

// import java.io.IOException;

// @Component
// public class MemberIdFilter implements Filter {

//     @Override
//     public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//             throws IOException, ServletException {

//         HttpServletRequest httpRequest = (HttpServletRequest) request;
//         HttpServletResponse httpResponse = (HttpServletResponse) response;

//         // 헤더에서 memberId를 가져와 request attribute에 설정
//         String memberId = httpRequest.getHeader("memberId");
//         if (memberId != null) {
//             httpRequest.setAttribute("memberId", Long.parseLong(memberId));
//         }

//         chain.doFilter(httpRequest, httpResponse);
//     }

// }
