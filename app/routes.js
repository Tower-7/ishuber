var Pc = require('./Controllers/pc/index')
var PcPost = require('./Controllers/pc/post')
var Admin = require('./Controllers/admin/index')
var Article = require('./Controllers/admin/article')
var AdminPost = require('./Controllers/admin/post')
var Upload = require('./Controllers/upload/index')
var Common = require('./Controllers/common/index')
var Base = require('./Controllers/base/index')

var Move = require('./Controllers/move/index')

module.exports = function(server) {
	
	server.use(function(req,res,next) {
	    var _user = req.session.user
	    server.locals.user = _user
	    next()
	})

	//common
	server.get('/logout',Common.logout)

	//主页	
	server.get('/',Pc.index)
	server.get('/demo1',Pc.index)
	server.get('/contact',Pc.contact)
	server.get('/project',Pc.project)
	// server.get('/read',Pc.read)
	server.get('/logout',Pc.logout)


	// pc端页面

	server.get('/read/readList',Pc.readList) //文章列表页
	server.get('/read/createRead',PcPost.signRequired,Pc.createRead) //创建read页面
	server.post('/read/submitRead',PcPost.signRequired,PcPost.submitRead) //发布read
	server.get('/read/:id',Pc.read)

	//sign
	server.get('/sign_up',Pc.sign_up) //注册
	server.post('/sign_up',PcPost.sign_up)
	server.post('/sign_up/check',PcPost.signUpCheck)

	server.get('/sign_in',Pc.sign_in) //登录
	server.post('/sign_in',PcPost.sign_in) //登录




	//后台管理页面
	server.get('/Admin',PcPost.signRequired,Admin.index)
	server.post('/Admin/post/project',PcPost.signRequired,AdminPost.editProject)  //编辑随笔
	server.post('/Admin/post/addProject',PcPost.signRequired,AdminPost.addProject)  //编辑随笔
	server.post('/Admin/post/submit',PcPost.signRequired,AdminPost.submit)  //编辑随笔
	server.post('/Admin/post/project/delet',PcPost.signRequired,AdminPost.deletProject)  //编辑随笔
	//banner
	server.post('/admin/banner/create',PcPost.signRequired,PcPost.signRequired,AdminPost.createBanner)
	server.post('/admin/banner/delete',PcPost.signRequired,AdminPost.deleteBanner)
	server.post('/admin/banner/update',PcPost.signRequired,AdminPost.updateBanner)

	//project
	server.post('/admin/project/create',PcPost.signRequired,AdminPost.createProject)
	server.post('/admin/project/delete',PcPost.signRequired,AdminPost.deleteProject)
	server.post('/admin/project/update',PcPost.signRequired,AdminPost.updateProject)

	//read
	server.post('/admin/read/create',PcPost.signRequired,AdminPost.createRead)
	server.post('/admin/read/delete',PcPost.signRequired,AdminPost.deleteRead)
	server.post('/admin/read/update',PcPost.signRequired,AdminPost.updateRead)
	
	//user
	server.post('/admin/user/delete',PcPost.signRequired,AdminPost.deleteUser)

	//Aticle 
	server.get('/admin/article',PcPost.signRequired,Article.index) //文章管理
	server.post('/admin/articleRead/delete',PcPost.signRequired,Article.deleteRead) //文章管理
	server.get('/admin/articleRead/update/:id',PcPost.signRequired,Article.viewUpdateRead) //文章管理
	server.post('/admin/articleRead/update',PcPost.signRequired,Article.updateRead) //文章管理






	//移动端页面

	server.get('/m/',Move.index) //index
	server.get('/m/addEssay',Move.signRequired,Move.addEssay) //index
	server.post('/m/submitEssay',Move.signRequired,Move.submitEssay) //index
	server.get('/m/detailRead/:id',Move.detailRead) //detail
	server.get('/m/sign',Move.sign) //detail
	server.get('/m/profile',Move.signRequired,Move.profile) //detail
	server.get('/m/myWrite/:name',Move.signRequired,Move.myWrite) //detail
	server.get('/m/myArticle/:name',Move.signRequired,Move.myArticle) //detail
	server.post('/m/essay/del',Move.signRequired,Move.delEssay) //detail

	server.get('/m/addArticle',Move.signRequired,Common.addArticle) //index
	server.get('/m/addArticleContent',Move.signRequired,Common.addArticleContent) //index
	server.get('/m/addArticle/:id',Move.signRequired,Move.viewUpdateArticle) //index
	server.post('/m/saveArticle',Move.signRequired,Common.saveArticle) //index
	server.get('/m/addArticleContent/:id',Move.signRequired,Move.viewArticleContent) //index

	server.post('/m/removeContentPic',Move.signRequired,Common.removeContentPic) //index

	server.post('/m/article/del',Move.signRequired,Common.delArticle) //index
	

	//上传文件
	server.post('/upload',Upload.upload)


	//config
	// server.post('/signture', Base.wxconfig)

	
}
