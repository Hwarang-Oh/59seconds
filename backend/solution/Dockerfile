FROM openjdk:17-jdk-slim

WORKDIR /app

COPY build/libs/solution-0.0.2-SNAPSHOT.jar solution.jar
 
ENV TZ Asia/Seoul

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "/app/solution.jar", "--spring.profiles.active=prod"]