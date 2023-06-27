var express = require('express');
const dayjs = require('dayjs')
const AccountModel = require('../../models/AccountModel');
const checkSession = require('../../middlewares/checkSession');
var router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/account')
})

router.get('/account', checkSession, function (req, res) {
  AccountModel.find().sort({ billTime: -1 }).then(data => {
    res.render('account', { accounts: data, dayjs })
  }).catch(e => {
    response.status(500)
    response.send(`internet error: ${e}}`)
  })
});

router.get('/account/create', checkSession, (req, res) => {
  res.render('create')
})

router.post('/account/create', checkSession, (req, response) => {
  AccountModel.create({ ...req.fields, billTime: dayjs(req.fields.billTime) }).then(res => {
    response.render('result', { msg: '创建成功', url: 'account' })
  }).catch(e => {
    response.status(500)
    response.send(`插入失败: ${e}}`)
  })
})

// 删除记录
router.get('/account/:id', checkSession, (req, res) => {
  const id = req.params.id
  console.log(id)

  AccountModel.deleteOne({ _id: id }).then(ret => {
    res.status(200).render('result', { msg: '删除成功', url: 'account' })
  }).catch(e => {
    res.status(500).send(`删除失败: ${e}`)
  })
})

module.exports = router;
