CREATE DATABASE IF NOT EXISTS beerprod;
USE beerprod;

CREATE TABLE IF NOT EXISTS statusCodes
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS productions
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    batchid    INT,
    startStamp DATETIME,
    stopStamp  DATETIME,
    statusId   BIGINT,  -- Foreign key to statusCodes table
    FOREIGN KEY (statusId) REFERENCES statusCodes(id)
);

CREATE TABLE IF NOT EXISTS batch
(
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    timeStamp    DATETIME,
    beerType     VARCHAR(255),
    amount       FLOAT,
    speed        FLOAT,
    fail         INT,
    success      INT,
    productionId BIGINT,  -- Foreign key to productions table
    FOREIGN KEY (productionId) REFERENCES productions(id)
);

CREATE TABLE IF NOT EXISTS snapshot
(
    id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    batchId   BIGINT,  -- Foreign key to batch table
    temp      FLOAT,
    humidity  FLOAT,
    vibration FLOAT,
    FOREIGN KEY (batchId) REFERENCES batch(id)
);
