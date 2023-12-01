# Use an official OpenJDK runtime as a parent image
FROM openjdk:11-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application JAR
COPY target/bobbybrewer-0.0.1-SNAPSHOT.jar /app/bobbybrewer.jar

# Expose the port your application runs on
EXPOSE 8080

# Command to run your application
CMD ["java", "-jar", "bobbybrewer.jar"]
