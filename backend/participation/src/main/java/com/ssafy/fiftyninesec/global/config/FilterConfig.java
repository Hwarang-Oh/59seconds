//package com.ssafy.fiftyninesec.global.config;
//
//import com.ssafy.fiftyninesec.global.filter.CorsPreflightFilter;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//@RequiredArgsConstructor
//public class FilterConfig {
//
//    private final CorsPreflightFilter corsPreflightFilter;
//
//    @Bean
//    public FilterRegistrationBean<CorsPreflightFilter> loggingFilter() {
//        FilterRegistrationBean<CorsPreflightFilter> registrationBean = new FilterRegistrationBean<>();
//        registrationBean.setFilter(corsPreflightFilter);
//        registrationBean.addUrlPatterns("/*");
//
//        return registrationBean;
//    }
//}
