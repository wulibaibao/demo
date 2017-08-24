var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/index?',(req,res,next)=>{
	res.render('index',{title:"express",message:"index-id"})
})

module.exports = router;
