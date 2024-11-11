package com.ssafy.fiftyninesec.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class RedisConfig {
    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

    @Bean(destroyMethod = "shutdown")
    public RedissonClient redissonClient() {
        Config config = new Config();
        try {
            String address = String.format("redis://%s:%d", host, port);
            config.useSingleServer()
                    .setAddress(address)
                    .setConnectionMinimumIdleSize(1)
                    .setConnectionPoolSize(2)
                    .setRetryAttempts(3)
                    .setRetryInterval(1500)
                    .setConnectTimeout(10000); // 10초

            RedissonClient redisson = Redisson.create(config);
            // 연결 테스트
            redisson.getBucket("test").delete();
            log.info("Redis Connection Success - host: {}, port: {}", host, port);
            return redisson;
        } catch (Exception e) {
            log.error("Redis Connection Failed - host: {}, port: {}", host, port, e);
            throw new RuntimeException("Could not create RedissonClient", e);
        }
    }

    @Bean
    public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new StringRedisSerializer());
        return template;
    }
}