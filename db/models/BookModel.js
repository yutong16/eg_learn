const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    name: String,
    type: String,
    author: String,
    price: Number
})

module.exports = mongoose.model('books', BookSchema)