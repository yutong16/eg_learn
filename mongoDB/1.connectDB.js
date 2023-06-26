const mongoose = require('mongoose')

// 连接 mongodb 服务
mongoose.connect('mongodb://127.0.0.1:27017/mTest')

// 设置回调
// 设置连接成功的回调
mongoose.connection.once('open', () => {
    console.log('connect success')
})

// 设置连接失败的回调
mongoose.connection.on('error', () => {
    console.log('connect fail')
})
// 设置连接关闭的回调
mongoose.connection.on('close', () => {
    console.log('connect close')
})

// 关闭mongoDB的操作
// setTimeout(() => {
//     mongoose.disconnect()
// }, 2000)