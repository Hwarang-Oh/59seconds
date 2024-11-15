FROM openjdk:17-jdk-slim

WORKDIR /app

COPY build/libs/participation-0.0.2-SNAPSHOT.jar participation.jar
 
ENV TZ Asia/Seoul
EXPOSE 9091
ENTRYPOINT ["java", "-jar", "/app/participation.jar", "--spring.profiles.active=prod"]