var express = require('express');
var bodyParser = require('body-parser');

var server = express();
server.listen(8080);
server.use(bodyParser.urlencoded({ extended: false }))
server.use('/',function(req,res){
	res.setHeader('Content-Type', 'text/plain')
	console.log('链接服务器');
	console.log(req.body);
	res.send('hello world');
	res.end();
})