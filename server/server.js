const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',  // Replace with your MySQL host if using a cloud service
  user: 'root',       // Replace with your MySQL username
  password: 'password', // Replace with your MySQL password
  database: 'user_auth'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).send({ message: 'Error creating user' });
      }
      res.status(201).send({ message: 'User created successfully' });
    });
  } catch (error) {
    res.status(500).send({ message: 'Error creating user' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
