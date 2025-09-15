const mysql = require('mysql2');

// Create connection without specifying database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: 3306
});

console.log('Connecting to MySQL...');

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  
  console.log('Connected to MySQL successfully!');
  
  // Create database
  connection.query('CREATE DATABASE IF NOT EXISTS WorkshopManagement', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database WorkshopManagement created successfully!');
    
    // Use the database
    connection.query('USE WorkshopManagement', (err) => {
      if (err) {
        console.error('Error using database:', err);
        return;
      }
      console.log('Using WorkshopManagement database');
      
      // Create customer table
      const createCustomerTable = `
        CREATE TABLE IF NOT EXISTS customer (
          customer_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          phonenumber VARCHAR(20),
          email VARCHAR(255)
        )
      `;
      
      connection.query(createCustomerTable, (err) => {
        if (err) {
          console.error('Error creating customer table:', err);
          return;
        }
        console.log('Customer table created successfully!');
        
        // Create vehicle table
        const createVehicleTable = `
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
          )
        `;
        
        connection.query(createVehicleTable, (err) => {
          if (err) {
            console.error('Error creating vehicle table:', err);
            return;
          }
          console.log('Vehicle table created successfully!');
          
          // Create work_order table
          const createWorkOrderTable = `
            CREATE TABLE IF NOT EXISTS work_order (
              work_order_id INT AUTO_INCREMENT PRIMARY KEY,
              work_order_code VARCHAR(100),
              advisory_note TEXT,
              work_order_time DATETIME,
              vehicle_id INT,
              customer_id INT,
              FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id),
              FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
            )
          `;
          
          connection.query(createWorkOrderTable, (err) => {
            if (err) {
              console.error('Error creating work_order table:', err);
              return;
            }
            console.log('Work_order table created successfully!');
            
            // Insert sample data
            const insertCustomerData = `
              INSERT IGNORE INTO customer (name, phonenumber, email) VALUES 
              ('John Doe', '123-456-7890', 'john.doe@example.com'),
              ('Jane Smith', '098-765-4321', 'jane.smith@example.com')
            `;
            
            connection.query(insertCustomerData, (err) => {
              if (err) {
                console.error('Error inserting customer data:', err);
                return;
              }
              console.log('Sample customer data inserted!');
              
              const insertVehicleData = `
                INSERT IGNORE INTO vehicle (registration_number, make, model, year, fuel, mileage, customer_id) VALUES 
                ('ABC123', 'Toyota', 'Camry', 2020, 'Gasoline', 50000, 1),
                ('XYZ789', 'Honda', 'Civic', 2019, 'Gasoline', 45000, 2)
              `;
              
              connection.query(insertVehicleData, (err) => {
                if (err) {
                  console.error('Error inserting vehicle data:', err);
                  return;
                }
                console.log('Sample vehicle data inserted!');
                
                const insertWorkOrderData = `
                  INSERT IGNORE INTO work_order (work_order_code, advisory_note, work_order_time, vehicle_id, customer_id) VALUES 
                  ('WO001', 'Regular maintenance', '2024-01-15 10:00:00', 1, 1),
                  ('WO002', 'Oil change', '2024-01-16 14:30:00', 2, 2)
                `;
                
                connection.query(insertWorkOrderData, (err) => {
                  if (err) {
                    console.error('Error inserting work order data:', err);
                    return;
                  }
                  console.log('Sample work order data inserted!');
                  console.log('\n✅ Database setup completed successfully!');
                  console.log('You can now run your server with: node server.js');
                  
                  connection.end();
                });
              });
            });
          });
        });
      });
    });
  });
});
