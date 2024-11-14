package com.ssafy.fiftyninesec.global.config;

import io.minio.MinioClient;
import io.minio.errors.MinioException;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

@Configuration
public class MinioConfig {

    @Getter
    @Value("${minio.endpoint}")
    private String endpoint;

    @Value("${minio.access-key}")
    private String accessKey;

    @Value("${minio.secret-key}")
    private String secretKey;

    @Bean
    public MinioClient minioClient()
            throws MinioException, NoSuchAlgorithmException, KeyManagementException {
        MinioClient minioClient = MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();
        minioClient.ignoreCertCheck(); // 이슈번호 #79
        return minioClient;
    }
}
