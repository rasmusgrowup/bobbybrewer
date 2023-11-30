CREATE DATABASE IF NOT EXISTS basics;
USE basics;

CREATE TABLE IF NOT EXISTS productionHistory (
    id LONG AUTO_INCREMENT PRIMARY KEY,
    beerType FLOAT,
    timeStampStart DATETIME,
    timeStampStop DATETIME,
    machSpeed FLOAT,
    amountCount FLOAT,
    defectiveCount FLOAT,
    processedCount FLOAT
);