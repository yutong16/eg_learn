module.exports = function (req, res, next) {
    console.log(req.session)
    if (!req.session.username) {
        return res.redirect('/login')
    }
    next()
}