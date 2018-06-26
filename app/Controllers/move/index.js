var fs = require('fs');

var article = require('../../Models/Common/article')
var essay = require('../../Models/Move/essay')
//read页面
exports.index = function(req,res){
    article.findAllPublic(function(err,articles) {
        if(err) {
            console.log(err)
        }
        essay.findAll(function(err,essays) {
            if(err) {
                console.log(err)
            }
            res.render('move/index',{
                articles: articles,
                essays: essays,
            })
        })
    })

     
}

//read页面
exports.addEssay = function(req,res){
  res.render('move/addEssay')
}

exports.submitEssay = function(req,res){
    var author = req.body.author
    var coverPic = req.body.coverPic
    var content = req.body.content
    var _essay 
    _essay = new essay({
        author: author,
        coverPic: coverPic,
        content: content,
    })
    _essay.save(function(err,essay) {
        if(err) {
            console.log(err)
        }
        res.json({
            'id': _essay._id,
            'title': _essay.author,
            'coverPic': _essay.coverPic,
            'content': _essay.content,
        })
    })
   
}

//sign页面
exports.sign = function(req,res){
  res.render('move/sign')
}
exports.detailRead = function(req,res){
	var id = req.params.id
    article.findById(id,function(err,article) {
        if(err) {
            console.log(err)
        }
        res.render('move/detailRead',{
            article: article,
        })
    })
}

exports.signRequired = function(req,res,next) {
    var user = req.session.user
    var url = req.originalUrl
    if(!user){
        return res.redirect('/m/sign?' + url)
    }
    next()
}

//profile页面
exports.profile = function(req,res){
  res.render('move/profile')
}

//profile页面
exports.myArticle = function(req,res){
    var name = req.params.name
    article.findByName(name,function(err,articles) {
        if(err) {
            console.log(err)
        }
        res.render('move/myArticle',{
            articles:articles,
        })
    })
}

//profile页面
exports.myWrite = function(req,res){
    var name = req.params.name
    essay.findByName(name,function(err,essays) {
        if(err) {
            console.log(err)
        }
        res.render('move/myWrite',{
            essays:essays,
        })
    })
}

//profile页面
exports.delEssay = function(req,res){
    var id = req.body.id
    var name = req.session.name
    essay.findById(id, function(err,essay) {
        fs.unlink('/upload/'+essay.coverPic, function (err) {
            if (err) return console.log(err);
            console.log('文件删除成功');
        })
        
    })
    essay.deletById(id,function(err){
        if(err) {
            console.log(err)
        }
        res.redirect('/m/myWrite/'+name)
    })
}


exports.viewUpdateArticle = function(req,res) {
    var id = req.params.id
    article.findById(id, function(err,article) {
        if(err) {
            console.log(err)
        }
        res.render('move/addArticle',{
            article: article,
        })
    })
}
exports.viewArticleContent = function(req,res) {
    var id = req.params.id
    article.findById(id, function(err,article) {
        if(err) {
            console.log(err)
        }
        res.render('move/addArticleContent',{
            article: article,
        })
    })
}