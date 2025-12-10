const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/employee")

const EmployeeModel = require('./models/Employee')

// ✅ REGISTER ROUTE (unchanged, already correct)
app.post('/register', (req, res) => {
  EmployeeModel.create(req.body)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: "Registration failed" })
    })
})


// ✅ FIXED LOGIN ROUTE
app.post('/login', (req, res) => {
  const { email, password } = req.body

  EmployeeModel.findOne({ email })
    .then((user) => {

      if (!user) {
        return res.json({ message: "User Not Found" })
      }

      if (user.password !== password) {
        return res.json({ message: "Incorrect Password" })
      }

      return res.json({ message: "Login Successful", user })

    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: "Server Error" })
    })
})


// ✅ SERVER START
app.listen(3001, () => {
  console.log("Port 3001 Running")
})
