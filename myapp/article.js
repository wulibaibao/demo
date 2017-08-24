var express = require('express');
var router = express.Router();

var db = require('mogoskin').db('mongodb://localhost:27017/express_demo',{natibe_parser:true});

router.get('/',function(req,res,next){
	res.send('respond with a article');
})

router.get(/^\id/\(\d+)$/,function(req,res,next){
	var article_id = req.params[0];
	db.collection('article').findOne({id:parseInt(article_id)},function(err,result){
		if(err){
			next(err);
		}
		res.send(result);
	})
})

module.exports = router;