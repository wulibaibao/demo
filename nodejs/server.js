/**
 * Created by sun on 2017/3/23.
 */
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const url = require('url');

var users = {}
const server = http.createServer(function(req,res){
	//解析数据
	var str = '';

	req.on('data',function(data){
		str += data;
	})

	req.on('end',function(){
		var obj = url.parse(req.url,true);
		const GET = obj.query;
		const POST = querystring.parse(str);
		const urlPath = obj.pathname;

		console.log(GET)
		if(urlPath == '/user'){ //接口
			switch (GET.act) {
				case 'reg':
					//1.检查用户名是否已经有
					if(users[GET.user]){
						res.write('{"ok":false,"msg":"此用户已存在"}')
					}else{
						//2.插入users
						users[GET.user] = GET.pass;
						res.write('{"ok":true,"msg":"注册成功"}')
					}
					break;
				case 'login':
				//1.检查用户是否存在
					if(users[GET.user] == null){
						console.log(users[GET.user]);
						res.write('{"ok":false,"msg":"此用户不存在"}');
					}else if(users[GET.user]!= GET.pass){
						res.write('{"ok":false,"msg":"用户名或密码有误"}')
					}else{
						res.write('{"ok":true,"msg":"登陆成功"}')
					}
					break;
				default:
					res.write('{"ok":"false","mag":"未知的act"}')
					break;
			}
			res.end();
		}else{  //文件
			//读取文件
			var file_name = './www' + urlPath;
			fs.readFile(file_name,function(err,data){
				if(err){
					res.write('404')
				}else {
					res.write(data);
				}
				res.end();
			})
		}
	})
}).listen(8080,'localhost')