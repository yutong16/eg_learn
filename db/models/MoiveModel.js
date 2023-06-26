const mongoose = require('mongoose')

const MoiveSchema = new mongoose.Schema({
    title: String,
    type: String
})

module.exports = mongoose.model('movies', MoiveSchema)