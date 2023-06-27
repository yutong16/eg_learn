const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // 从请求头中获取token
    const token = req.get('token')
    if (!token) {
        return res.json({
            code: 2003,
            msg: '没有token',
            data: null
        })
    }
    jwt.verify(token, 'aries', (err, data) => {
        if (err) {
            return res.json({
                code: 2004,
                msg: 'token校验失败',
                data: null
            })
        }
        // 保存用户信息
        req.user = data
        next()
    })
}