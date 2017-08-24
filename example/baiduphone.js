var cheerio = require('cheerio');
var superagent = require('superagent');
var fs = require('fs');
var express = require('express');
var server = express();

server.listen(3000);

superagent.get('http://haoma.baidu.com/yellowPage')
	.end((err,data)=>{
		if(err)throw err;
		var json = [];
		if(data){
			var $ = cheerio.load(data.text);
			$('.dial').each((i,element)=>{ //1层
				var textName = $(element).find('.text').text().trim();
				//console.log(pathName)
				json.push({
					text : textName,
					item : [] 
				})
				$(element).find('.item').each((j,ele)=>{  //2层
					//拿到text 还有小的item
					//console.log($(ele).find('.item_detail').length)
					var imgSrc = $(ele).find('a').find('.item_image img').attr('src2') ? $(ele).find('a').find('.item_image img').attr('src2') : $(ele).find('.normal').find('.item_image img').attr('src2');
					let randomStr = 'logo' + j;
					var imgSrcRealName = '';
					if(imgSrc != undefined){
						if(-1 < imgSrc.indexOf('png'))
							imgSrcRealName = __dirname + '/carpic/baiduphone/'+ i + '/' + randomStr + '.png';
						if(-1 < imgSrc.indexOf('jpeg'))
							imgSrcRealName = __dirname + '/carpic/baiduphone/'+ i + '/' + randomStr + '.jpeg';
						if(-1 < imgSrc.indexOf('gif'))
							imgSrcRealName = __dirname + '/carpic/baiduphone/'+ i + '/' + randomStr + '.gif';
						if(-1 < imgSrc.indexOf('jpg'))
							imgSrcRealName = __dirname + '/carpic/baiduphone/'+ i + '/' + randomStr + '.jpg';
						//console.log(imgSrcRealName);
						superagent.get(imgSrc).end((error,str)=>{
													if(error)throw error;
													fs.writeFile(imgSrcRealName,str.body,()=>{
														//console.log('success');
													})
												})
					}

					if($(ele).find('.item_detail').length > 0){
						let list = [];
						$(ele).find('.item_detail').each((q,e)=>{
							list.push({
								listName : $(e).find('.desc').text() ? $(e).find('.desc').text().trim() : $(e).find('.url_desc').text().trim(),
								listPhone : $(e).find('.number').text() ? $(e).find('.number').text().trim() : $(e).find('.url a').text()
							})
						})
						//console.log($(ele).find('a').find('.item_text').first().text());
						json[i].item.push({
							imgSrc : imgSrc,
							name : $(ele).find('a').find('.item_text').first().text().trim(),
							realSrc : imgSrcRealName,
							list : list
						})
					}else{
						json[i].item.push({
							imgSrc : imgSrc,
							name : $(ele).find('.normal').find('.item_text_2 li').first().text(),
							realSrc : imgSrcRealName,
							tel : $(ele).find('.normal').find('.item_text_2 li').last().text()
						})
						//console.log($(ele).find('.item_text_2 li').last().text())
					}
				})
			})
		}
		fs.writeFile('./json/baiduphone.json',JSON.stringify(json),(err,data)=>{
			if(err)throw  err;
			console.log('success');
		})
		server.use('/',(req,res)=>{
			res.send(JSON.stringify(json));
			res.end();
		})
	})