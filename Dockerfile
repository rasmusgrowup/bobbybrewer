# Build stage
FROM maven:3.8.3-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn package

# Run stage
FROM openjdk:17
WORKDIR /app
COPY --from=build /app/target/bobbybrewer-0.0.1-SNAPSHOT.jar /app/

CMD ["java", "-jar", "bobbybrewer-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080
EXPOSE 4840
