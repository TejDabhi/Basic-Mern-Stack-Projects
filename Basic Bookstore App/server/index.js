const cors=require('cors')
const express=require('express')
const mongoose=require('mongoose')

const AdminModel=require('./models/Admin')
const BookModel=require('./models/Book')
const StudentModel=require('./models/Student')

mongoose.connect('mongodb://127.0.0.1:27017/Website-1')


const app=express()
app.use(express.json())
app.use(cors())



app.post('/login',(req,res)=>{
    const {username,password,role}=req.body
    if(role==="admin"){
        AdminModel.findOne({username})
        .then((user)=>{
            if(!user){
                return res.json({message:"Admin not exist "})
            }
            if(user.password!==password){
                return res.json({message:"Incorrect Password"})
            }
            return res.json({message:"Login Succesfull",login:true,role:"admin",admin:true})
        })
        .catch(err=>{
            return res.json({message:err})
        })
    }if(role==="student"){
        StudentModel.findOne({username:username})
        .then((user)=>{
            if(!user){
                return res.json({message:"Student not exist"})
            }
            if(user.password!==password){
                return res.json({message:"Incorrect Password"})
            }
            return res.json({message:"Login Succesfull",login:true,role:"student",admin:false})
        })
        .catch(err=>{
            return res.json({message:err})
        })
    }
})
app.get('/logout',(req,res)=>{
    return res.json({logout:true})
})

// Add Book 
app.post('/addBook', (req, res) => {
  const { name } = req.body

  BookModel.findOne({ name })
    .then(book => {
      if (book) {
        return res.json({ message: "Book Already exist" })
      }

      BookModel.create(req.body)
      return res.json({ message: "Book Added" })
    })
    .catch(err => {
      return res.json({ message: err })
    })
})

// Add Student 
app.post('/addStudent', (req, res) => {
  const { username,rollno,grade,password } = req.body

  StudentModel.findOne({ username })
    .then(user => {
      if (user) {
        return res.json({ message: "Student Already exist" })
      } else {
        StudentModel.create(req.body)
        return res.json({ message: "Student Added" })
      }
    })
    .catch(err => {
      return res.json({ message: err })
    })
})

app.get('/getBooks', async (req, res) => {
  try {
    const books = await BookModel.find()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' })
  }
})
app.get('/editBook/:id',(req,res)=>{
    const {id}=req.params
    BookModel.findById(id)
    .then((user)=>{
        return res.json(user)
    })
    .catch(err=>{
        return res.json(err)
    })
})
app.put(`/updateBook/:id`,(req,res)=>{
    const {id}=req.params
    BookModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        author:req.body.author,
        imageUrl:req.body.imageUrl
    }).then(user=>{
        return res.json(user)
    })
    .catch(err=>{
        return res.json(err)
    })    

})
app.delete('/deleteBooks/:id',(req,res)=>{
    const {id}=req.params
    BookModel.findByIdAndDelete({_id:id})
    .then((user)=>{
        return res.json(user)
    })
    .catch((err)=>{
        return res.json(err)
    })
})
app.get('/dashboard',async (req,res)=>{
    try {
        const student=await StudentModel.countDocuments()
        const admin=await AdminModel.countDocuments()
        const book=await BookModel.countDocuments()
        return res.json({student:student,admin:admin,book:book})
    } catch (error) {
        return res.json(error)
    }
})

app.listen(3001,()=>{console.log('Port 3001 Running')})