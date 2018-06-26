var mongoose = require('mongoose')

var essaySchema = new mongoose.Schema({
	coverPic:String,
	content: String,
	author: String,
	meta: {
		createAt: {
			type:Date,
			default:Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})
essaySchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
essaySchema.statics = {
	findAll: function(cb) {
		return this
		.find({})
		.sort({'meta.createAt':-1})
		.exec(cb)
	}, 
	findById: function(id,cb) {
		return this
		.find({_id:id})
		.exec(cb)
	}, 
	findByName: function(name,cb) {
		return this
		.find({author:name})
		.sort({'meta.createAt':-1})
		.exec(cb)
	},
	updateById: function(id,author,coverPic,content,cb) {
		return this
		.update({_id: id},{$set:{author:author,coverPic:coverPic,content:content}})
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
module.exports = essaySchema