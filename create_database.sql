CREATE DATABASE IF NOT EXISTS currency_converter;

USE currency_converter;

CREATE TABLE IF NOT EXISTS conversions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    base_currency VARCHAR(10),
    target_currency VARCHAR(10),
    amount FLOAT,
    converted_amount FLOAT,
    rate FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
