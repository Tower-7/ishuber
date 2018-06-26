var ArticleRead = require('../../Models/Pc/read')
//read页面
exports.index = function(req,res){
    ArticleRead.findAll(function(err,articleReads) {
        if(err) {
            console.log(err)
        }
        res.render('admin/article',{
            articleReads: articleReads,
        })
    })
}
exports.deleteRead = function(req,res) {
	var id = req.body.id
	ArticleRead.deletById(id, function(err) {
		if(err) {
			console.log(err)
		}
		else {
			res.redirect('/admin/article')
		}
	})
}

exports.viewUpdateRead = function(req,res) {
	var id = req.params.id
	ArticleRead.findById(id, function(err,articleRead) {
		if(err) {
			console.log(err)
		}
		res.render('admin/article/read',{
            articleRead: articleRead,
        })
	})
}
exports.updateRead = function(req,res) {
	var id = req.body.id
	var title = req.body.title
	var type = req.body.type
	var coverPic = req.body.coverPic
	var content = req.body.content
	ArticleRead.updateById(id,title,type,coverPic,content, function(err,articleRead) {
		if(err) {
			console.log(err)
		}
		res.redirect('/read/readList')
	})
}