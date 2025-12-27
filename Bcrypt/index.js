const cors =require('cors')
const express=require('express')
const mongoose =require('mongoose')
const bcrypt=require('bcrypt')

const EmployeeModel=require('./models/Employee')
const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/employee")

app.post('/register',(req,res)=>{
    const {name,email,password}=req.body
    bcrypt.hash(password,10)
    .then(hash=>{
        EmployeeModel.create({name,email,password:hash})
        .then((user)=>{
            return res.json(user)
        })
        .catch(err=>{
            return res.json(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    EmployeeModel.findOne({ email })
        .then(user => {
            if (!user) {
                return res.json({ message: "No record existed" });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.json({ message: "Server error" });
                }

                if (isMatch) {
                    return res.json({ message: "Login successful" });
                } else {
                    return res.json({ message: "Incorrect password" });
                }
            });
        })
        .catch(err => res.json(err));
});




app.listen(3001,()=>{
    console.log("Port 3001 running")

})
