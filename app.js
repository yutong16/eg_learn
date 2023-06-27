var createError = require('http-errors');
var express = require('express');
var path = require('path');
const formidableMiddleware = require('express-formidable');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { DBHOST, DBNAME, DBPORT } = require('./config/config')

// 导入session
const session = require('express-session')
const MongoStore = require('connect-mongo');

var indexRouter = require('./routes/web/index');
var usersRouter = require('./routes/users');
const avatarRouter = require('./routes/avatar')
const accountRouter = require('./routes/api/account')
const authApiRouter = require('./routes/api/auth')

const authRouter = require('./routes/web/auth');

var app = express();
// 设置session中间件
app.use(session({
  name: 'sid',        // 设置cookie的name, 默认值是: connect.sid
  secret: 'aries', // 参与加密的字符串  加盐
  saveUninitialized: false,  // 是否为每次请求都设置一个cookie用来存储session的id
  resave: true,  // 是否在每次请求时重新保存session
  store: MongoStore.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie: {
    httpOnly: true, //开启后前端无法通过Js获取
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

app.use(formidableMiddleware({
  encoding: 'utf-8',
  uploadDir: __dirname + '/public/images',
  multiples: true,
  keepExtensions: true
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置路径前缀
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/avatar', avatarRouter);

app.use('/api', accountRouter);
app.use('/api', authApiRouter)
app.use(authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
