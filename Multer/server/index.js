const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')

const UserModel = require('./models/User')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/employee')

// ❌ REMOVE THIS (not needed anymore)
// app.use('/Images', express.static('public/Images'))

// Multer MEMORY storage
const upload = multer({
    storage: multer.memoryStorage()
})

// Upload route
app.post('/upload', async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(400).json(err)
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }

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

// Get image by ID
app.get('/getImage/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    res.set('Content-Type', user.image.contentType)
    res.send(user.image.data)
})

app.listen(3001, () => {
    console.log("Port 3001 Running")
})
