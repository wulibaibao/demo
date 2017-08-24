var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var eventproxy = require('eventproxy');
var express = require('express');
var fs = require('fs');
var http = require('http');

var server = express();

var baseUrl = 'http://m.autohome.com.cn/default/getindexcar?v=20161228'

var carMation = {};

server.listen(3000,(err)=>{
	console.log('服务器开启：localhost:3000...')
})

superagent.get(baseUrl)
	.end((err,data)=>{
		if(err)console.log(err);
		let topics = [];
		let carList = [];
		let count = 0;

		var $ = cheerio.load(data.text);
		console.log($('#div_ListBrand .brandgroup').length);
		$('#div_ListBrand h3').each(function(i,ele){
			topics.push($(ele).text());
		})
		$('#div_ListBrand .brandgroup').each(function(i,element){
			carList.push({
				listname : topics[i],
				list:[]
			})
			$(element).find('li').each(function(j,ele){

				let randomHash = parseInt(Math.random()*1000000  + 1001000);
				let realSrc = './carpic/carhome/' + randomHash + '.jpg'
				let picSrc = 'http:' + $(ele).find('img').attr('data-src')
				carList[i].list.push({
					name:$(ele).find('strong').text(),
					picSrc : picSrc,
					realSrc : realSrc
				});

				if(picSrc){

					superagent.get(picSrc).end(function(err,sres){
		                if(err)throw err;
		                //根据访问路径获得文件名称

		                fs.writeFile(realSrc,sres.body,function(){
		                    count++;
		                    console.log('已成功抓取..'+count+'张');
		                });
		            });
				}

			})
		})
		carMation.result = carList;

		fs.writeFile('./json/carhome.json',carMation,()=>{
			console.log('存储成功')
		})
	})

	server.use('/',function(req,res){
		res.send(JSON.stringify(carMation));
	})







