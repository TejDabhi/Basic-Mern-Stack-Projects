const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('users', UserModel)
