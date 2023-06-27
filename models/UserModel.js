const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
    },
})

module.exports = mongoose.model('users', UserSchema)