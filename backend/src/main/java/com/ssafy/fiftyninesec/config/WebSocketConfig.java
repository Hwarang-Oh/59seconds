package com.ssafy.fiftyninesec.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // 클라이언트가 웹소켓에 연결할 엔드포인트를 등록
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*");
    }

    // 메시지 브로커를 구성
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 클라이언트에게 메시지를 전달할 때 사용하는 경로 설정
        config.enableSimpleBroker("/result/sub");
        // 클라이언트가 메시지를 보낼 때 사용하는 경로의 접두사 설정
        config.setApplicationDestinationPrefixes("/result/pub");
    }
}
