## 📦 Image Upload Using Multer (Memory Storage) & MongoDB

This project demonstrates how to upload images directly into MongoDB using Multer memory storage, without saving files to any folder.

## 🚀 Features

Upload image from React frontend
No Images or public folder used
Image stored directly in MongoDB
Image retrieved and displayed using API
Simple & beginner-friendly setup

## 🧠 How It Works

Frontend sends image using FormData
Multer stores image temporarily in memory
Image is saved into MongoDB as:
Buffer (binary data)
contentType (image/jpeg, image/png, etc.)
Image is fetched by ID and streamed to browser

## 📦 Dependencies
npm install express mongoose cors multer

## 📁 MongoDB Schema
```
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('users', UserSchema)
```

## 🔹 Why contentType?

It tells the browser what type of image it is, so it can display it correctly.

🛠 Backend Code (Express + Multer)

server.js
```
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')

const UserModel = require('./models/User')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/employee')

// Multer MEMORY storage (no folders)
const upload = multer({
    storage: multer.memoryStorage()
})

// Upload image directly to MongoDB
app.post('/upload', async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) return res.status(400).json(err)
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

        try {
            const user = await UserModel.create({
                image: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                }
            })
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    })
})

// Fetch image by ID
app.get('/getImage/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    res.set('Content-Type', user.image.contentType)
    res.send(user.image.data)
})

app.listen(3001, () => {
    console.log("Port 3001 Running")
})
```

## 🌐 Frontend (React + Axios)
```
import { useState } from "react"
import axios from "axios"

function App() {
  const [file, setFile] = useState(null)
  const [imageId, setImageId] = useState(null)

  const handleUpload = async () => {
    if (!file) return alert("Select a file first")

    const formData = new FormData()
    formData.append("file", file)

    const res = await axios.post("http://localhost:3001/upload", formData)
    setImageId(res.data._id)
  }

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      {imageId && (
        <img
          src={`http://localhost:3001/getImage/${imageId}`}
          width="200"
        />
      )}
    </div>
  )
}

export default App
```
## ⚠️ Important Notes

This method is NOT recommended for large images
MongoDB size grows quickly
Best used for:
Learning
College projects
Small images

❌ Not suitable for production apps

👉 Use Cloudinary / AWS S3 / GridFS instead


Simple setup	✅
Scalable	❌
