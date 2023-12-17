FROM node

RUN mkdir /app
WORKDIR /app
COPY src/main/frontend/package.json /app
COPY src/main/frontend/ /app
RUN npm install
EXPOSE 3000
CMD ["npm", "start", "--port 3000"]