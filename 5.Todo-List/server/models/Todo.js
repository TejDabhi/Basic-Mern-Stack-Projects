const mongoose=require('mongoose')
const TodoModel=new mongoose.Schema({
    task:{type:String,required:true},
})
module.exports=mongoose.model("todos",TodoModel)