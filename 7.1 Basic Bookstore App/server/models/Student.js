const mongoose=require('mongoose')
const StudentModel=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    rollno:{type:String,required:true},
    grade:{type:String,required:true},
    password:{type:String,required:true}
})
module.exports=mongoose.model('Students',StudentModel)