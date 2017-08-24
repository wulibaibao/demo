var mysql = require('mysql');
var express = require('express');

var server = express();
server.listen(3000);
var _options = {
    host:'localhost',
    user:'root',
    password:'692415abc',
    database:'wechat'
}
var db = mysql.createPool(_options);

db.query(`SELECT * FROM user_table WHERE account='${request.body.account}'`,(err,data)=>{
	if(!err){
		console.log(data);
	}
}
