var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/account', function (req, res, next) {
  res.render('account')
});

router.get('/account/create', (req, res) => {
  res.render('create')
})

router.post('/account/create', (req, res) => {
  res.send('接受数据成功!')
})

module.exports = router;
