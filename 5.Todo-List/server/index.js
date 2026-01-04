const cors=require('cors')
const express=require('express')
const mongoose=require('mongoose')

const app=express()
app.use(cors())
app.use(express.json())

const EmployeeModel=require('./models/Employee')
const TodoModel=require('./models/Todo')

app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then((user)=>{
        return res.json(user)
    })
    .catch((err)=>{
        return res.json(err)
    })
})
app.post('/login',(req,res)=>{
    const {email,password}=req.body
    EmployeeModel.findOne({email:email})
    .then((user)=>{
        if (!user){
            return res.json({message:"User Not Found"})
        }
        if(password!==user.password){
            return res.json({message:"Incorrect Password"})
        }
        return res.json(user)
    })
    .catch((err)=>{
        return res.json(err)
    })
})
app.post('/add',(req,res)=>{
    TodoModel.create(req.body)
    .then((user)=>{
        return res.json(user)
    })
    .catch((err)=>{
        return res.json(err)
    })
})
app.get('/get', (req, res) => {
  TodoModel.find()
    .then((todos) => {
      return res.json(todos)
    })
    .catch((err) => {
      return res.status(500).json(err)
    })
})
app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id
    TodoModel.findByIdAndDelete({_id:id}).
    then(res=>res.json(res))
    .catch(err=>res.json(err))
})


mongoose.connect('mongodb://127.0.0.1:27017/employee')

app.listen(3001,()=>{console.log("Port 3001 Running")})