# Build stage for frontend
FROM node:14-alpine as frontend
WORKDIR /frontend
COPY ../frontend .
RUN npm install
RUN npm run build

# Build stage for backend
FROM maven:3.8.3-openjdk-17 as build
WORKDIR /app
COPY . .
COPY --from=frontend /frontend/build /app/src/main/resources/static
RUN mvn package

# Run stage
FROM openjdk:17
WORKDIR /app
COPY --from=build /app/target/bobbybrewer-0.0.1-SNAPSHOT.jar /app/

CMD ["java", "-jar", "bobbybrewer-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080
