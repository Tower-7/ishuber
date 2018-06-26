var Project = require('../../Models/Admin/project')
var Banner = require('../../Models/Admin/banner')
var Read = require('../../Models/Admin/read')
var User = require('../../Models/Pc/user')
exports.editProject = function(req,res){
	var id = req.body.id
	var content = req.body.content
	console.log(content)
	var content = content
	Project.updateById(id,content,function(err,projects){
		if(err){
			console.log(err)
		}
		res.redirect('/admin')
	})
}
exports.addProject = function(req,res){
	var content = req.body.content
	
	var _project
	_project = new Project({
		content: content,
	})
	_project.save(function(err,projects){
		if(err){
			console.log(err)
		}
		res.redirect('/admin')
	})
}

exports.submit = function(req,res){
	var title = req.body.title
	var imgUrl = req.body.imgUrl
	var content = req.body.content
	
	var _project
	_project = new Project({
		title: title,
		imgUrl: imgUrl,
		content: content,
	})
	_project.save(function(err,projects){
		if(err){
			console.log(err)
		}
		res.redirect('/admin')
	})
}

exports.deletProject = function(req,res){
	var id = req.body.id
	Project.deletById(id,function(err,projects){
		if(err){
			console.log(err)
		}
		res.redirect('/admin')
	})
}

exports.createBanner = function(req,res) {
	var id
	var title = req.body.title
	var type = req.body.type
	var link = req.body.link
	var imgUrl = req.body.imgUrl
	var _banner 
	_banner = new Banner({
		title: title,
		type: type,
		link: link,
		imgUrl: imgUrl,
	})
	_banner.save(function(err,banners) {
		if(err) {
			console.log(err)
		}
		res.json({
			id: _banner._id,
			title: _banner.title,
			type: _banner.type,
			link: _banner.link,
			imgUrl: _banner.imgUrl,
		})
	})
}

exports.deleteBanner = function(req,res) {
	var id = req.body.id
	Banner.deletById(id,function(err){
		if(err){
			console.log(err)
		}
		res.redirect('/admin')
	})
}

exports.updateBanner = function(req,res) {
	var id = req.body.id
	var title = req.body.title
	var type = req.body.type
	var link = req.body.link
	var imgUrl = req.body.imgUrl
	Banner.updateById(id,title,type,link,imgUrl,function(err,banners){
		if(err){
			console.log(err)
		}
		res.json({
            imgUrl : imgUrl
        })
	})
}

//PROJECT
exports.createProject = function(req,res) {
	var id
	var title = req.body.title
	var type = req.body.type
	var link = req.body.link
	var imgUrl = req.body.imgUrl
	var _project
	_project = new Project({
		title: title,
		type: type,
		link: link,
		imgUrl: imgUrl,
	})
	_project.save(function(err,projects) {
		if(err) {
			console.log(err)
		}
		res.json({
			id: _project._id,
			title: _project.title,
			type: _project.type,
			link: _project.link,
			imgUrl: _project.imgUrl,
		})
	})
}

exports.deleteProject = function(req,res) {
	var id = req.body.id
	Project.deletById(id,function(err){
		if(err){
			console.log(err)
		}
		res.redirect('/admin')
	})
}

exports.updateProject = function(req,res) {
	var id = req.body.id
	var title = req.body.title
	var type = req.body.type
	var link = req.body.link
	var imgUrl = req.body.imgUrl
	Project.updateById(id,title,type,link,imgUrl,function(err,projects){
		if(err){
			console.log(err)
		}
		res.json({
            imgUrl : imgUrl
        })
	})
}

//READ
exports.createRead = function(req,res) {
	var id
	var title = req.body.title
	var type = req.body.type
	var link = req.body.link
	var imgUrl = req.body.imgUrl
	var _read 
	_read = new Read({
		title: title,
		type: type,
		link: link,
		imgUrl: imgUrl,
	})
	_read.save(function(err,reads) {
		if(err) {
			console.log(err)
		}
		res.json({
			id: _read._id,
			title: _read.title,
			type: _read.type,
			link: _read.link,
			imgUrl: _read.imgUrl,
		})
	})
}

exports.deleteRead = function(req,res) {
	var id = req.body.id
	Read.deletById(id,function(err){
		if(err){
			console.log(err)
		}
		res.redirect('/admin')
	})
}

exports.updateRead = function(req,res) {
	var id = req.body.id
	var title = req.body.title
	var type = req.body.type
	var link = req.body.link
	var imgUrl = req.body.imgUrl
	Read.updateById(id,title,type,link,imgUrl,function(err,reads){
		if(err){
			console.log(err)
		}
		res.json({
            imgUrl : imgUrl
        })
	})
}


exports.deleteUser = function(req,res) {
	var id = req.body.id
	User.deleteById(id,function(err){
		if(err){
			console.log(err)
		}
		res.redirect('/admin')
	})
}