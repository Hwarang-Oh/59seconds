#FROM openjdk:17-jdk-slim
#VOLUME /tmp
#COPY build/libs/dreamsolution-0.0.1-SNAPSHOT.jar contents.jar
#EXPOSE 9090
#ENV TZ Asia/Seoul
#ENTRYPOINT ["java", "-jar", "/contents.jar"]
FROM openjdk:17-jdk-slim

# Create directory for application
WORKDIR /app

# Copy the JAR file to the application directory
COPY build/libs/dreamsolution-0.0.1-SNAPSHOT.jar contents.jar

# Set timezone
ENV TZ Asia/Seoul

# Expose port
EXPOSE 9090

# Run the Spring Boot application with the specified profile
ENTRYPOINT ["java", "-jar", "/app/contents.jar", "--spring.profiles.active=prod"]
