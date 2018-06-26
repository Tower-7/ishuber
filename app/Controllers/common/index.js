var fs = require('fs'); 
var article = require('../../Models/Common/article')
//read页面
exports.addArticle = function(req,res){
  res.render('move/addArticle',{
        article: '',
    })
}

//read页面
exports.addArticleContent = function(req,res){
  res.render('move/addArticleContent',{
	article: '',
  })
}


//read页面
exports.saveArticle = function(req,res){
	var id = req.body.id
	var author = req.body.author
	var title = req.body.title
	var coverPic = req.body.coverPic
	var content = req.body.content
	var type = req.body.type
	var public = req.body.public
	if(id) {
		article.updateById(id,title,type,coverPic,content,public,function(err) {
			if(err) {
				console.log(err)
			}
			res.json({
		        'id': id,
		        'author': author,
		    })
		})
	}
	else {
		var _article 
		_article = new article({
		    author: author,
		    title: title,
		    coverPic: coverPic,
		    type: type,
		    content: content,
		    public: public,
		})
		_article.save(function(err,article) {
		    if(err) {
		        console.log(err)
		    }
		    res.json({
		        'id': article._id,
		        'author': article.author,
		    })
		})
	}
		
}

//read页面
exports.removeContentPic = function(req,res){
	var path = req.body.path
	path = 'public' + path
	fs.unlinkSync(path)
	res.json({
		        'data': '',
		    })
}

//delArticle页面
exports.delArticle = function(req,res){
	var id = req.body.id
	var name = req.session.name
    article.deletById(id,function(err){
        if(err) {
            console.log(err)
        }
        res.redirect('/m/myArticle/'+name)
    })
}


exports.logout = function(req,res) {
    delete req.session.user
    res.redirect('/')
}

