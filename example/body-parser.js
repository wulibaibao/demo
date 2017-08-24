/*
常见的四种Content-Type类型：

	1.application/x-www-form-urlencoded 常见的form提交
	2.multipart/form-data 文件提交
	3.application/json 提交json格式的数据
	4.text/xml 提交xml格式的数据
*/

const express=require('express');
const bodyParser=require('body-parser');

var server=express();
server.listen(3000);

server.use(bodyParser.urlencoded({
  extended: false,                 //扩展模式
  limit:    2*1024*1024           //限制-2M
}));

server.use('/', function (req, res){
  console.log(req.body); //POST
  console.log(req.query); //get
});

//req.query   GET
//req.body    POST