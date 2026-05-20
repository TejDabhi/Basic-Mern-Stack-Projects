const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EmployeeModel = require('./models/Employee');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/employee')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Register API
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await EmployeeModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // Hash Password
        const hash = await bcrypt.hash(password, 10);

        // Create User
        const user = await EmployeeModel.create({
            name,
            email,
            password: hash
        });

        res.status(201).json({
            message: 'User registered successfully',
            user
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'Server error'
        });
    }
});

// Login API
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find User
        const user = await EmployeeModel.findOne({ email });

        // User Not Found
        if (!user) {
            return res.status(404).json({
                message: 'No record existed'
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({
                message: 'Login successful'
            });
        } else {
            return res.status(401).json({
                message: 'Incorrect password'
            });
        }

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'Server error'
        });
    }
});

// Server
app.listen(3001, () => {
    console.log('Port 3001 running');
});
