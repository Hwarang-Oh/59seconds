#FROM openjdk:17-jdk-slim
#VOLUME /tmp
#COPY build/libs/dreamsolution-0.0.1-SNAPSHOT.jar contents.jar
#EXPOSE 9090
#ENV TZ Asia/Seoul
#ENTRYPOINT ["java", "-jar", "/contents.jar"]

FROM openjdk:17-jdk-slim

# Create directory for application
WORKDIR /app

# Create directory for config files
RUN mkdir -p /app/config
 
# Copy the jar file
COPY build/libs/dreamsolution-0.0.1-SNAPSHOT.jar contents.jar

# Copy the application-secret.yml file
COPY build/config/application-secret.yml /app/config/application-secret.yml

RUN chmod 644 /app/config/application-secret.yml
# Set timezone
ENV TZ Asia/Seoul
 
# Expose port
EXPOSE 9090

# Change the entrypoint to look for the config file in the correct location
ENTRYPOINT ["java", "-jar", "/app/contents.jar", \
            "--spring.config.location=classpath:/application.yml,file:/app/config/application-secret.yml", \
            "--spring.profiles.active=prod"]
