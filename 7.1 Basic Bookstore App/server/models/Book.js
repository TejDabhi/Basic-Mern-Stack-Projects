const mongoose=require('mongoose')
const BookModel=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    author:{type:String,required:true},
    imageUrl:{type:String,required:true}
})
module.exports=mongoose.model('Books',BookModel)