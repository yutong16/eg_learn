const mongoose = require('mongoose')

// 连接 mongodb 服务
mongoose.connect('mongodb://127.0.0.1:27017/mTest')

// 设置回调
// 设置连接成功的回调
mongoose.connection.once('open', () => {
    console.log('connect success')
    // 1.创建文档的结构对象
    // 设置集合中 文档的属性及属性的类型
    let BookSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true    //  表面该字段值必须是唯一的，需要重建集合才能生效
        },
        author: {
            type: String,
            default: '匿名'
        },
        style: {
            type: String,
            enum: ['言情', 'love', 'arum']
        },
        price: Number,
        is_hot: Boolean,
        tags: Array
    })

    // 2.创建模型对象, 对文档操作的封装对象
    let BookModel = mongoose.model('books', BookSchema)

    // 3.新增数据
    BookModel.create({
        name: '三国志2',
        author: '陈寿',
        price: 29.9,
        is_hot: true,
        tags: ['love', 'histroy']
    }).then(res => {
        console.log(res)
        // 关闭连接
        mongoose.disconnect()
    }).catch(err => {
        console.log('err', err)
    })
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