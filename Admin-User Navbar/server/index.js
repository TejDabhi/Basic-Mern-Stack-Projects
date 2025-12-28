const cors=require('cors')
const express=require('express')
const mongoose=require('mongoose')

const AdminModel=require('./models/Admin')

const app=express()
app.use(express.json())
app.use(cors())
app.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    if (role === "admin") {
        AdminModel.findOne({ username })
            .then(user => {

                if (!user) {
                    return res.json({ message: "Admin Not Found" });
                }

                if (user.password !== password) {
                    return res.json({ message: "Incorrect Password" });
                }

                return res.json({
                    login: true,
                    role: "admin",
                    message: "Success"
                });

            })
            .catch(err => {
                return res.json({ message: err });
            });
    } else {
        return res.json({ message: "Invalid role" });
    }
});


// app.post('/login',(req,res)=>{
//     const {username,password,role}=req.body
//     if(role=="admin"){
//         AdminModel.findOne({username})
//         .then((user)=>{
//             if(!user){
//                 res.json({message:"Admin Not Found"})
//             }
//             if(user.password!==password){
//                 res.json({message:"Incorrect Password"})
//             }
//             return res.json({login:true,role:'admin',message:"Sucess"})
//         }) 
//         .catch((err)=>{
//             res.json({message:err})
//         })
//     }else {
//         return res.json({ message: "Invalid role" });
//     }       
// })
app.get('/logout',(req,res)=>{
    return res.json({logout:true})
})



mongoose.connect('mongodb://127.0.0.1:27017/Website-1')

app.listen(3001,()=>{
    console.log("Port 3001 Running")
})