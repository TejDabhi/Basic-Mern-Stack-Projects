# 🔐 Password Security with bcrypt (MERN Stack)

This MERN stack application uses bcrypt to securely manage user passwords during registration and login.
bcrypt ensures passwords are never stored in plain text and provides strong protection against common security attacks.

⚙️ bcrypt Functionalities
## 1️⃣ Password Hashing (Signup)

During user registration, the password is hashed before storing it in MongoDB.
const bcrypt = require("bcrypt");
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
Converts plain password into a secure hash
Automatically adds a unique salt
Stores only the hashed password in the database

✅ Used in Signup API
```
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
```
## 2️⃣ Password Comparison (Login)

During login, bcrypt compares the entered password with the stored hash.
const isMatch = await bcrypt.compare(password, user.password);
Returns true if passwords match
Returns false if credentials are invalid
Original password is never revealed

✅ Used in Login API
```
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

```

## 🔄 Authentication Flow

User signs up with email and password
Password is hashed using bcrypt
Hashed password is stored in MongoDB
User logs in with credentials
bcrypt compares entered password with stored hash
User is authenticated if passwords match

## 🛡️ Security Advantages

No plain-text password storage
Automatic salting for each password
Resistant to brute-force and rainbow-table attacks
Industry-standard security practice for MERN apps


bcrypt provides secure hashing and comparison mechanisms that are essential for safe authentication in MERN stack applications. This implementation follows best practices for handling sensitive user credentials.
