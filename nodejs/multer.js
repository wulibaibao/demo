var fs = require('fs');
var express = require('express');
var multer = require('multer')

var app = express();
var upload = multer({dest:"upload/"})

app.post('/upload',upload.single('logo'),function(req,res,next){
	res.send({ret_code:'0'})
});
app.get('/form',function(req,res,next){
	var form = fs.readFileSync('./form.html',{encoding:'utf-8'});
	res.send(form)
})
app.listen(3000)