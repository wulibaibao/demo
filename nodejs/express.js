const express = require('express');
const expressStatic = require('express-static')
var server = express();

server.use(expressStatic('./www'));

server.use('/a.html',function(req,res){
	res.send('{"ok":"afdaffds"}')
	res.end()
})
server.use('/b.html',function(req,res){
	res.send('123')
	res.end()
})

server.get('/',function(req,res){
	console.log('get请求')
})
server.post('/',function(req,res){
	console.log('post请求')
})

server.listen(8080);


//express 框架
//安装，配置，接收请求，响应

//非侵入式框架  保留了原生功能

/*
.get('/',function(req,res){})
.post('/',function(req,res){})
.use('/',function(req,res){})

*/