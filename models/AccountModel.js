const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    accountType: {
        required: true,
        type: String
    },
    billTime: {
        required: true,
        type: Date,
    },
    billType: {
        required: true,
        type: Number,
        tags: [-1, 1]
    },
    account: {
        required: true,
        type: Number
    },
    remark: String
})

module.exports = mongoose.model('accounts', AccountSchema)