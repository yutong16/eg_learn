const db = require('./db')
const BookModel = require('./models/BookModel')
// 连接数据库
db(() => {
    BookModel.create({
        name: '浏阳河',
        type: 'music',
        author: 'aries',
        price: 28
    }).then(res => {
        console.log('插入成功', res)
    }).catch(e => {
        console.log('失败', e)
    })
})