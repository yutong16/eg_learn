var express = require('express')
var md5 = require('md5');
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/UserModel');

var router = express.Router()

router.post('/login', (req, res) => {
    const { username, password } = req.fields
    UserModel.findOne({ username: username, password: md5(password) }).then(data => {
        if (data !== null) {
            const token = jwt.sign({
                username: data.username,
                _id: data._id
            }, 'aries', { expiresIn: 60 * 60 })
            return res.json({
                code: 0,
                msg: '登录成功',
                data: token
            })
        }
        return res.json({
            code: 2001,
            msg: '账户或者密码错误',
            data: null
        })
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