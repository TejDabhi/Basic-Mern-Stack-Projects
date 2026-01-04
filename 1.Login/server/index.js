const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const EmployeeModel=require('./models/Employee');

const app=express();  
app.use(express.json());
app.use(cors()); 

mongoose.connect("mongodb://127.0.0.1:27017/employee")

app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json({error: err}))
});

app.post('/login',(req,res)=>{
    const {email,password}=req.body;

    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        if(user.password !== password){
            return res.status(400).json({message:"Invalid Password"});
        }

        res.status(200).json({message:"Login successful", user});
    })
    .catch(err => res.status(500).json({error: err}));
});
app.get("/home/:email", (req, res) => {
  const email = req.params.email;

  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json({ error: err }));
});



app.listen(3001,()=>{
    console.log("Server started on port 3001");
});
 