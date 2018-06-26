var express = require('express');
var ejs = require('ejs');
var path = require('path');
var multer = require('multer')
var ueditor = require("ueditor");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoose = require('mongoose')
var MongoStore = require('connect-mongo')(session)
var morgan = require('morgan')
var io = require('socket.io');
var port = 2000;
var server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
// view engine setup

//链接数据库
mongoose.Promise = global.Promise; 
// var dbUrl = 'mongodb://127.0.0.1/web'
var dbUrl = 'mongodb://admin:xyzqq*859632@47.88.53.87:16016/web'
mongoose.connect(dbUrl)

session
server.use(session({
secret: 'city',
resave: true,
saveUninitialized: true,
store: new MongoStore({
    url: dbUrl,
    collection: 'sessions',
})
}));



server.use(express.static(path.join(__dirname, 'public')));
server.set('views', path.join(__dirname, 'views'));
server.engine('.html', ejs.__express);
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, './views'));
server.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    //客户端上传文件设置
    var imgDir = '/img/ueditor/'
     var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'serverlication/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));


server.locals.moment = require('moment')
server.listen(port);

require('./app/routes')(server)
module.exports = server;
