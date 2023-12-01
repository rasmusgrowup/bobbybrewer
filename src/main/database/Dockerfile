# Use an official MySQL image
FROM mysql:8.0

# Environment variables for MySQL configuration
ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword
ENV MYSQL_ROOT_PASSWORD=myrootpassword

# Create a directory for initialization scripts
RUN mkdir /docker-entrypoint-initdb.d

# Copy your database initialization scripts to the container
COPY src/main/database/scripts/ /docker-entrypoint-initdb.d/