FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY build/libs/dreamsolution-0.0.1-SNAPSHOT.jar contents.jar
EXPOSE 9090
ENV TZ Asia/Seoul
ENTRYPOINT ["java", "-jar", "/contents.jar"]