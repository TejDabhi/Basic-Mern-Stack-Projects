const cors=require('cors')
const express=require('express')
const mongoose=require('mongoose')

const EmployeeModel=require('./models/Employee')
const CompanyEmployeeModel=require('./models/CompanyEmployee')

mongoose.connect('mongodb://127.0.0.1:27017/employee')

const app=express()
app.use(express.json())
app.use(cors())

app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then((user)=>{
        res.json(user)
    })
    .catch((err)=>res.status(400).json(err))
})

app.post('/login',(req,res)=>{
    const {email,password}=req.body
    EmployeeModel.findOne({email})
    .then((user)=>{
        if(!user){
            return res.status(400).json({message:"User not Found"})
        }if(user.password!==password){
            return res.status(400).json({message:"Incorrect Password"})
        }
        res.json(user)
    })
    .catch((err)=>res.status(400).json(err))
})
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

// company
app.post("/create",(req,res)=>{
    CompanyEmployeeModel.create(req.body)
    .then((user)=>res.json(user))
    .catch((err)=>res.status(500).json({error:err}))
})
app.get("/create",(req,res)=>{
    CompanyEmployeeModel.find()// fetch all the records
    .then((user)=>res.json(user))
    .catch((err)=>res.status(500).json({error:err}))
})
app.get("/edit/:id",(req,res)=>{
    const id=req.params.id
    CompanyEmployeeModel.find({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})
app.put('/edit/:id',(req,res)=>{
    const id=req.params.id
    CompanyEmployeeModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    })
    .then(users=>res.json(users))
    .catch(err=>res.json(err))

})
app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    CompanyEmployeeModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
})

app.listen(3001,()=>{console.log('Server Running on 3001 Port')})
