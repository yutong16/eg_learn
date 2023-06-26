const db = require('./db')
const MoiveModel = require('./models/MoiveModel')
// 连接数据库
db(() => {
    MoiveModel.create({
        title: '红楼梦',
        type: 'story',
    }).then(res => {
        console.log('插入成功', res)
    }).catch(e => {
        console.log('失败', e)
    })
})