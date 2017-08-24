var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var eventproxy = require('eventproxy');
var express = require('express');
var fs = require('fs');
var http = require('http');

var server = express();

var baseUrl = 'http://www.jianshu.com'

server.listen(3000,(err)=>{
	console.log('服务器开启：localhost:3000...')
})

server.get('/getPage',(req,res,next)=>{
	superagent.get(baseUrl)
	.end((err,data)=>{
		if(err)console.log(err);
		var topics = [];
		var $ = cheerio.load(data.text);

		$('.note-list li').each((i,element)=>{
			
			topics.push({
				title : $(element).find('.title').text(),
				userPic : url.resolve(baseUrl,$(element).find('.avatar img').attr('src')),
				content : $(element).find('.abstract').text().trim(),
				pictuers : 'http:' + $(element).find('.wrap-img img').attr('src')
			});
		})
		res.send(topics);
		next();
	})
})

server.get('/index',(req,res)=>{
	superagent.get(baseUrl)
		.end((err,data)=>{
			if(err)console.log(err);
			var $ = cheerio.load(data.text);
			var imgaeSrc = 'http:' + $('.note-list li').eq(0).find('.wrap-img img').attr('src');
			console.log(imgaeSrc);
			var str = ''
			http.get(imgaeSrc,(req,res)=>{
				req.setEncoding("binary");
				req.on('data',(chunk)=>{
					str +=chunk;
				});
				req.on('end',()=>{
					fs.writeFile('./123.jpg',str,"binary",(err)=>{
						if(err){console.log('down fail')}
						console.log('sucdess')
					})
				})
			})
		})
})

