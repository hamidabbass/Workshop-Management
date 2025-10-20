const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'WorkshopManagement',
  port: process.env.DB_PORT || 3306
});


db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// Fetch customers
app.get('/api/customers', (req, res) => {
  const sql = 'SELECT * FROM customer';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update customer
app.put('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  const { name, phonenumber, email } = req.body;
  const sql = 'UPDATE customer SET name = ?, phonenumber = ?, email = ? WHERE customer_id = ?';
  
  db.query(sql, [name, phonenumber, email, id], (err, results) => {
    if (err) {
      console.error('Error updating customer:', err);
      return res.status(500).json({ error: 'Failed to update customer' });
    }
    res.json({ message: 'Customer updated' });
  });
});


// Delete customer
app.delete('/api/customers/:id', (req, res) => {
  const { id } = req.params;

  // First, delete all work orders associated with this customer
  const deleteWorkOrdersSql = 'DELETE FROM work_order WHERE customer_id = ?';
  db.query(deleteWorkOrdersSql, [id], (err, results) => {
    if (err) {
      console.error('Error deleting work orders:', err);
      return res.status(500).json({ error: 'Failed to delete work orders' });
    }

    // Then, delete all vehicles associated with this customer
    const deleteVehiclesSql = 'DELETE FROM vehicle WHERE customer_id = ?';
    db.query(deleteVehiclesSql, [id], (err, results) => {
      if (err) {
        console.error('Error deleting vehicles:', err);
        return res.status(500).json({ error: 'Failed to delete vehicles' });
      }

      // Finally, delete the customer
      const deleteCustomerSql = 'DELETE FROM customer WHERE customer_id = ?';
      db.query(deleteCustomerSql, [id], (err, results) => {
        if (err) {
          console.error('Error deleting customer:', err);
          return res.status(500).json({ error: 'Failed to delete customer' });
        }
        res.json({ message: 'Customer deleted' });
      });
    });
  });
});
// Fetch vehicles
app.get('/api/vehicles', (req, res) => {
  const sql = 'SELECT * FROM vehicle';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update vehicle
app.put('/api/vehicles/:id', (req, res) => {
  const { id } = req.params;
  const { registration_number, make, model, year, fuel, mileage, customer_id } = req.body;
  const sql = 'UPDATE vehicle SET registration_number = ?, make = ?, model = ?, year = ?, fuel = ?, mileage = ?, customer_id = ? WHERE vehicle_id = ?';
  
  db.query(sql, [registration_number, make, model, year, fuel, mileage, customer_id, id], (err, results) => {
    if (err) {
      console.error('Error updating vehicle:', err);
      return res.status(500).json({ error: 'Failed to update vehicle' });
    }
    res.json({ message: 'Vehicle updated' });
  });
});


// Delete a vehicle and all associated work orders
app.delete('/api/vehicles/:id', (req, res) => {
  const { id } = req.params;

  // First, delete all work orders associated with this vehicle
  const deleteWorkOrdersSql = 'DELETE FROM work_order WHERE vehicle_id = ?';
  db.query(deleteWorkOrdersSql, [id], (err, results) => {
    if (err) {
      console.error('Error deleting work orders:', err);
      return res.status(500).json({ error: 'Failed to delete work orders' });
    }

    // Then, delete the vehicle
    const deleteVehicleSql = 'DELETE FROM vehicle WHERE vehicle_id = ?';
    db.query(deleteVehicleSql, [id], (err, results) => {
      if (err) {
        console.error('Error deleting vehicle:', err);
        return res.status(500).json({ error: 'Failed to delete vehicle' });
      }
      res.json({ message: 'Vehicle deleted' });
    });
  });
});





// Fetch customers with their work orders
app.get('/api/customers-with-workorders', (req, res) => {
    const sql = `
      SELECT 
        c.customer_id, c.name, c.phonenumber, c.email, 
        w.work_order_code, w.advisory_note, w.work_order_time
      FROM customer c
      INNER JOIN work_order w ON c.customer_id = w.customer_id
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching customers with work orders:', err);
        res.status(500).send('Error fetching customers with work orders');
        return;
      }
      res.json(results);
    });
  });
  

  // Add customer
app.post('/api/customers', (req, res) => {
    const { firstName, lastName, phoneNo, address, state, country } = req.body;
    const sql = `
      INSERT INTO customer (name, phonenumber, email) 
      VALUES (?, ?, ?)
    `;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`; // Generate email for simplicity
  
    db.query(sql, [`${firstName} ${lastName}`, phoneNo, email], (err, results) => {
      if (err) {
        console.error('Error adding customer:', err);
        res.status(500).send('Error adding customer');
        return;
      }
      res.status(201).send('Customer added');
    });
  });

  app.post('/api/vehicles', (req, res) => {
    const { registrationNo, year, make, model, fuel, mileage, customerId } = req.body;
    const sql = `
      INSERT INTO vehicle (registration_number, year, make, model, fuel, mileage, customer_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.query(sql, [registrationNo, year, make, model, fuel, mileage, customerId], (err, results) => {
      if (err) {
        console.error('Error inserting data', err);
        return res.status(500).json({ error: 'Failed to add vehicle' });
      }
      res.status(201).json({ message: 'Vehicle added successfully' });
    });
  });

app.post('/api/workorders', (req, res) => {
  const { vehicleId, advisoryNote, workOrderTime, customerId } = req.body;
  const sql = `
    INSERT INTO work_order (vehicle_id, advisory_note, work_order_time, customer_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [vehicleId, advisoryNote, workOrderTime, customerId], (err, results) => {
    if (err) {
      console.error('Error inserting work order:', err);
      return res.status(500).json({ error: 'Failed to add work order' });
    }
    res.status(201).json({ message: 'Work order added successfully' });
  });
});

  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
