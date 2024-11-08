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
            log.info("File uploaded successfully to MinIO.");
            return minioConfig.getEndpoint() + "/" + bucketName + "/" + fullPath;
        } catch (Exception e) {
            log.error("Error occurred while uploading: ", e);
            return null;
        }
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
