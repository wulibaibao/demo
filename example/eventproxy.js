var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');

var url = require('url');

var baseUrl = 'https://cnodejs.org';

var express = require('express');
var server = express();
server.listen(3000);

server.use('/',(request,response)=>{
	superagent.get(baseUrl)
		.end((err,res) =>{
			if(err){
				return console.log(err);
			}
			var topicUrls = [];
			var $ = cheerio.load(res.text);

			$('#topic_list .topic_title').each((i,element)=>{
				var $element = $(element);

				var href = url.resolve(baseUrl,$element.attr('href'));
				topicUrls.push(href);
			})

			var ep = new eventproxy();

			ep.after('html',topicUrls.length,(topics)=>{   
				
				topics = topics.map((tip)=>{
					var topicUrl = tip[0];
					var topicHtml = tip[1];
					var $ = cheerio.load(topicHtml);
					return({
						tltle:$('.topic_full_title').text().trim(),
						href : topicUrl,
						comment1 : $('.reply_content').eq(0).text().trim()
					})
				})
				response.send(topics);  //发送数据
			})
			
			topicUrls.forEach((topicUrl)=>{
				superagent.get(topicUrl)
					.end((err,res)=>{
						//console.log(topicUrl);
						ep.emit('html',[topicUrl,res.text]);
					})		
			})
		})
})

