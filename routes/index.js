var express = require('express');
const dayjs = require('dayjs')
const AccountModel = require('../models/AccountModel');
var router = express.Router();

/* GET home page. */
router.get('/account', function (req, res) {
  AccountModel.find().sort({ billTime: -1 }).then(data => {
    console.log(data)
    res.render('account', { accounts: data, dayjs })
  }).catch(e => {
    response.status(500)
    response.send(`internet error: ${e}}`)
  })
});

router.get('/account/create', (req, res) => {
  res.render('create')
})

router.post('/account/create', (req, response) => {
  AccountModel.create({ ...req.fields, billTime: dayjs(req.fields.billTime) }).then(res => {
    response.render('result')
  }).catch(e => {
    response.status(500)
    response.send(`插入失败: ${e}}`)
  })
})

// 删除记录
router.get('/account/:id', (req, res) => {
  const id = req.params.id
  console.log(id)

  AccountModel.deleteOne({ _id: id }).then(ret => {
    res.status(200).send('删除成功')
  }).catch(e => {
    res.status(500).send('删除失败')
  })
})

module.exports = router;
