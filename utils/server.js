const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('../routes/authRoutes');
const employeeRoutes = require('../routes/employeeRoutes');
const bikeRoutes = require('../routes/bikeRoutes');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/bikes', bikeRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
