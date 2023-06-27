var express = require('express');
const dayjs = require('dayjs')
const AccountModel = require('../../models/AccountModel');
var router = express.Router();

/* GET home page. */
router.get('/account', function (req, res) {
    AccountModel.find().sort({ billTime: -1 }).then(data => {
        res.json({
            code: 0,
            msg: 'ok',
            data: data
        })
    }).catch(e => {
        res.json({
            code: 1100,
            msg: 'internet error',
            date: null
        })
    })
});

router.post('/account/create', (req, response) => {
    AccountModel.create({ ...req.fields, billTime: dayjs(req.fields.billTime) }).then(res => {
        response.json({
            code: 0,
            msg: '插入成功',
            data: null
        })
    }).catch(e => {
        response.json({
            code: 1100,
            msg: 'internet error',
            date: null
        })
    })
})

// 删除记录
router.get('/account/:id', (req, res) => {
    const id = req.params.id
    console.log(id)

    AccountModel.deleteOne({ _id: id }).then(ret => {
        res.json({
            code: 0,
            msg: '删除成功',
            data: null
        })
    }).catch(e => {
        res.json({
            code: 1100,
            msg: 'internet error',
            date: null
        })
    })
})

module.exports = router;
