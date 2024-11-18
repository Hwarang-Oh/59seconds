package com.ssafy.fiftyninesec.global.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("59초 프로젝트 API")
                        .description("59초 프로젝트의 API 문서입니다.")
                        .version("v2.0"));
    }
}