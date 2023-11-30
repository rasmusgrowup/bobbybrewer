# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app/src/main/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 (the default for React development server)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
