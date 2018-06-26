var Project = require('../../Models/Admin/project')
var Banner = require('../../Models/Admin/banner')
var Read = require('../../Models/Admin/read')
var User = require('../../Models/Pc/user')
//index page
exports.index = function(req,res){
	Project.findAll(function(err,Projects) {
		if(err) {
			console.log(err)
		}
		Banner.findAll(function(err,Banners) {
			if(err) {
				console.log(err)
			}
			Read.findAll(function(err,Reads) {
				if(err) {
					console.log(err)
				}
				User.fetch(function(err,Users) {
					res.render('admin/index',{
				    	Projects: Projects,
				    	Banners: Banners,
				    	Reads: Reads,
				    	Users: Users,
				    })
				})
					
			})
				
		})
		   
	})
}
