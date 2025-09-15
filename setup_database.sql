
-- Create the WorkshopManagement database
CREATE DATABASE IF NOT EXISTS WorkshopManagement;

-- Use the database
USE WorkshopManagement;

-- Create customer table
CREATE TABLE IF NOT EXISTS customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(20),
    email VARCHAR(255)
);

-- Create vehicle table
CREATE TABLE IF NOT EXISTS vehicle (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    registration_number VARCHAR(50) NOT NULL,
    make VARCHAR(100),
    model VARCHAR(100),
    year INT,
    fuel VARCHAR(50),
    mileage INT,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- Create work_order table
CREATE TABLE IF NOT EXISTS work_order (
    work_order_id INT AUTO_INCREMENT PRIMARY KEY,
    work_order_code VARCHAR(100),
    advisory_note TEXT,
    work_order_time DATETIME,
    vehicle_id INT,
    customer_id INT,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- Insert some sample data
INSERT INTO customer (name, phonenumber, email) VALUES 
('John Doe', '123-456-7890', 'john.doe@example.com'),
('Jane Smith', '098-765-4321', 'jane.smith@example.com');

INSERT INTO vehicle (registration_number, make, model, year, fuel, mileage, customer_id) VALUES 
('ABC123', 'Toyota', 'Camry', 2020, 'Gasoline', 50000, 1),
('XYZ789', 'Honda', 'Civic', 2019, 'Gasoline', 45000, 2);

INSERT INTO work_order (work_order_code, advisory_note, work_order_time, vehicle_id, customer_id) VALUES 
('WO001', 'Regular maintenance', '2024-01-15 10:00:00', 1, 1),
('WO002', 'Oil change', '2024-01-16 14:30:00', 2, 2);
