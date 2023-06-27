var express = require('express')
var md5 = require('md5');
const UserModel = require('../../models/UserModel');
const session = require('express-session');

var router = express.Router()



router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', (req, res) => {
    const { username, password } = req.fields
    UserModel.findOne({ username: username, password: md5(password) }).then(data => {
        if (data !== null) {
            req.session.username = data.username;
            req.session._id = data._id
            return res.render('result', { msg: '登录成功', url: 'account' })
        }
        return res.render('result', { msg: '用户名或密码错误,请重试！', url: 'login' })
    })
})

router.get('/register', (req, res) => {
    res.render('auth/reg')
})

router.post('/register', (req, res) => {
    const { username, password } = req.fields;
    UserModel.create({
        username: username,
        password: md5(password)
    }).then(data => {
        res.render('result', { msg: '注册成功', url: 'login' })
    }).catch(e => {
        res.status(500).send(`注册失败:${e}}`)
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('result', { msg: "退出成功", url: 'login' })
    })
})
module.exports = router