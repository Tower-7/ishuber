var multer = require('multer');
var Storage = multer.diskStorage({
    destination:function(req,file,callback) {
        callback(null,"./public/upload")
    },
    filename:function (req,file,callback) {
        callback(null,file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})

var upload = multer({ storage: Storage }).single('file');

exports.upload = function(req,res){
    upload(req, res, function (err) {
        var imgPath = req.file.path
        var imgPath = imgPath.replace(/public/, "")
        if (err) {
            console.log(err)
            return res.end("Something went wrong!");
        }
        res.json({
            code : 200,
            imgPath : imgPath
        })
       
    });
}