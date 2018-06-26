var Project = require('../../Models/Admin/project')
var ViewRead = require('../../Models/Pc/read')


//index page
exports.index = function(req,res){
    Project.findAll(function(err,Projects) {
        if(err) {
            console.log(err)
        }
        res.render('pc/index',{
            Projects: Projects,
        })
    })
}
exports.demo1 = function(req,res){
    res.render('pc/demo1',{
    })
}

exports.contact = function(req,res){
    res.render('pc/contact',{
    })
}
exports.project = function(req,res){
    res.render('pc/project',{
    })
}
exports.createRead = function(req,res){
    res.render('pc/createRead')
}

//read页面
exports.readList = function(req,res){
    ViewRead.findAll(function(err,ViewReads) {
        if(err) {
            console.log(err)
        }
        res.render('pc/readList',{
            ViewReads: ViewReads,
        })
    })
}

//read页面
exports.read = function(req,res){
    var id = req.params.id
    id.replace(/favicon/, "")
    console.log(id)
    ViewRead.findById(id,function(err,article) {
        if(err) {
            console.log(err)
        }
        res.render('pc/read',{
            article: article,
        })
    })
}
exports.sign_up = function(req,res) {
    res.render('pc/sign_up')
}
exports.sign_in = function(req,res) {
    res.render('pc/sign_in')
}
exports.logout = function(req,res) {
    delete req.session.user
    res.redirect('/')
}