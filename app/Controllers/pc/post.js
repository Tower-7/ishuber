var viewRead = require('../../Models/Pc/read')
var user = require('../../Models/Pc/user')
var SALT_WORK_FACTOR = 10
//发布read页面
exports.submitRead = function(req,res) {
	var title = req.body.title
	var coverPic = req.body.coverPic
	var content = req.body.content
	var _viewRead 
	_viewRead = new viewRead({
		title: title,
		coverPic: coverPic,
		content: content,
	})
	_viewRead.save(function(err,viewReads) {
		if(err) {
			console.log(err)
		}
		res.json({
			id: _viewRead._id,
			title: _viewRead.title,
			coverPic: _viewRead.coverPic,
			content: _viewRead.content,
		})
	})
}

exports.sign_up = function(req,res) {
	var name = req.body.name
	var password = req.body.password
	var _user
	var url = req.headers.referer
	if(!url) {
		url = '/m/'
	}
	_user = new user({
		name: name,
		password: password,
	})
	user.findByName(name,function(err,user) {
		if(user != null) {
			res.json({'msg':'用户名已存在~','status':'2'})
		}
		else {
			_user.save(function(err,user) {
				if(err) {
					console.log(err)
				}
				res.json({'msg':'注册成功','status':'1','url':url})
			})
		}
	})	
}

exports.signUpCheck = function(req,res) {
	var name = req.body.name
	user.findByName(name,function(err,user) {
		if(err) {
			console.log(err)
		}
		if(user != null) {
			res.json({'msg':'用户名已存在~','status':'2'})
		}
		else {
			res.json({'msg':'用户名可用','status':'1'})
		}
	})
}

exports.sign_in = function(req,res,next) {
	var name = req.body.name
	var password = req.body.password
	var url = req.headers.referer
	if(!url) {
		url = '/m/'
	}
	user.findByName(name,function(err,user) {
		if(user == null) {
			res.json({'msg':'用户名不存在','status':'2'})
		}
		else {
			user.comparePassword(password,function(err,isMatch) {
				if(err){
					console.log(err)
				}
				if(isMatch) {
					req.session.user = user
					res.json({'msg':'登录成功','status':'1','url':url})
				}
				else {
					res.json({'msg':'密码错误','status':'3'})
				}
			})
		}
	})	
}
exports.signRequired = function(req,res,next) {
	var user = req.session.user
	if(!user){
		return res.redirect('/sign_in')
	}
	next()
}
			