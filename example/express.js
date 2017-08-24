var express = require('express');

var server = express();
server.listen(3000);

server.use('/',function(req,res){
	res.send('hellow world');
	res.end();
})