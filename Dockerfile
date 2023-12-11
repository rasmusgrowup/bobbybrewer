# Build stage
FROM maven:3.8.3-openjdk-17 AS build
WORKDIR /app

# Copy only the necessary files for Maven build
COPY pom.xml .
COPY src ./src

RUN mvn package

# Run stage
FROM node:14 AS frontend-build
WORKDIR /app

# Copy only the necessary files for npm install
COPY src/main/frontend/package.json .
COPY src/main/frontend/package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY src/main/frontend/ .

# Build the React/Next.js app
RUN npm run build

# Final stage
FROM openjdk:17
WORKDIR /app

# Copy the built JAR file and the React/Next.js build into the container
COPY --from=build /app/target/bobbybrewer-0.0.1-SNAPSHOT.jar /app/
COPY --from=frontend-build /src/main/frontend/out /app/

# Use ENTRYPOINT instead of CMD
ENTRYPOINT ["java", "-jar", "/app/bobbybrewer-0.0.1-SNAPSHOT.jar"]

# Expose the necessary ports
EXPOSE 8080
EXPOSE 3000
EXPOSE 4840