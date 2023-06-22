const express = require('express')
// const formidable = require('formidable')
// import formidable from 'formidable'
const router = express.Router()

router.get('/', (req, res) => {
    res.render('avatar')
})

router.post('/upload', (req, res) => {
    const newFileName = req.files.avatar.path.split('public')[1]
    res.send(newFileName)
})

module.exports = router