package com.ssafy.fiftyninesec.global.util;

import com.ssafy.fiftyninesec.global.config.MinioConfig;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.GetObjectArgs;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Slf4j
@Component
public class MinioUtil {

    private final MinioConfig minioConfig;
    private MinioClient minioClient;
    public final String DefaultBannerUrl = "https://k11a404.p.ssafy.io:8998/event-image/default/Default_Banner.png";
    public final String DefaultRectangleUrl = "https://k11a404.p.ssafy.io:8998/event-image/default/Default_Rectangle.png";
    public final String DefaultProfileUrl = "https://k11a404.p.ssafy.io:8998/profile-image/default/Default_Profile.png";

    public MinioUtil(MinioClient minioClient, MinioConfig minioConfig) {
        this.minioClient = minioClient;
        this.minioConfig = minioConfig;
    }

    public String uploadImage(String bucketName, String fullPath, MultipartFile file) {
        try (InputStream fileInputStream = file.getInputStream()) {
            long size = file.getSize();
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(fullPath)
                            .stream(fileInputStream, size, -1)
                            .build()
            );

            log.info("파일 '{}'이(가) MinIO의 '{}' 경로에 성공적으로 업로드되었습니다.", fullPath, bucketName);

            String fileUrl = String.format("%s/%s/%s",
                    minioConfig.getEndpoint(),
                    bucketName,
                    fullPath);

            return fileUrl;
        } catch (Exception e) {
            log.error("업로드 중 오류가 발생했습니다. 파일: '{}', 경로: '{}', 오류: {}", fullPath, bucketName, e.getMessage());
            return null;
        }
    }

    public String generateFilePath(String originalFilename, String filename) {
        String extension = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : ""; // 확장자 추출
        return String.format("%s%s", filename, extension); // 파일 이름 변경
    }

    public InputStream getImage(String bucketName, String objectName) {
        try {
            return minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .build()
            );
        } catch (Exception e) {
            System.err.println("Error occurred while fetching the image: " + e.getMessage());
            return null;
        }
    }
}
