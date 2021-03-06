var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const moment = require('moment');
const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file')

const logPath = './logs/framework.log';
const logFolder = path.dirname(logPath);

try {
    fs.mkdirSync(logFolder);
    winston.info('log folder created', logFolder);
} catch (err) {
    winston.info('log folder already exist', logFolder);
}

winston.remove(winston.transports.Console);
winston.add(winstonDailyRotateFile, {
    filename: logPath,
    dirname: path.dirname(logPath),
    datePattern: '.yyyy-MM-dd',
    colorize: false,
    level: 'debug',
    json: true,
    timestamp() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    },
});

var routes = require('./controllers/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

// 设置前端项目的静态目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'fe/m.system/build')));
app.use('/sharing', express.static(path.join(__dirname, 'fe/sharing/modules-in-nodejs')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
