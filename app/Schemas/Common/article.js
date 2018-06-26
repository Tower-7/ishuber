var mongoose = require('mongoose')

var articleSchema = new mongoose.Schema({
	title: String,
	type: String,
	coverPic: String,
	content: String,
	author: String,
	check: Boolean,
	public: Boolean,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})
articleSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
articleSchema.statics = {
	findAll: function(cb) {
		return this
		.find({})
		.sort({'meta.createAt':-1})
		.exec(cb)
	}, 
	findAllPublic: function(cb) {
		return this
		.find({public:true})
		.sort({'meta.createAt':-1})
		.exec(cb)
	}, 
	findById: function(id,cb) {
		return this
		.find({_id: id})
		.exec(cb)
	},
	findByName: function(name,cb) {
		return this
		.find({author: name})
		.sort({'meta.createAt':-1})
		.exec(cb)
	},
	updateById: function(id,title,type,coverPic,content,public,cb) {
		return this
		.update({_id: id},{$set:{title:title,type:type,coverPic:coverPic,content:content,public: public}})
		.exec(cb)
	},
	deletById: function(id,cb) {
		return this
		.remove({_id:id})
		.exec(cb)
	},
	deletByCheck: function(check,cb) {
		return this
		.remove({check:ture})
		.exec(cb)
	}
}
module.exports = articleSchema