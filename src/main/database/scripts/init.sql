CREATE DATABASE IF NOT EXISTS beerprod;
USE beerprod;

CREATE TABLE IF NOT EXISTS statusCodes
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS productions
(
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    start_stamp     DATETIME,
    stop_stamp      DATETIME,
    status_id       BIGINT, -- Foreign key to statusCodes table
    defective_count INT,
    processed_count INT,
    beer_type       FLOAT,
    amount_count    FLOAT,
    mach_speed      FLOAT,
    FOREIGN KEY (status_id) REFERENCES statusCodes (id)
);

CREATE TABLE IF NOT EXISTS snapshot
(
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    productions_id BIGINT, -- Foreign key to batch table
    temp          FLOAT,
    humidity      FLOAT,
    vibration     FLOAT,
    FOREIGN KEY (productions_id) REFERENCES productions (id)
);