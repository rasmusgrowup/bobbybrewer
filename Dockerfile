FROM openjdk:17-oracle

RUN mkdir /app
WORKDIR /app
COPY target/backend-0.0.1-SNAPSHOT.jar /app/DemoApplication.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/DemoApplication.jar"]
