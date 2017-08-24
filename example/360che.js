var superagent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');

var baseUrl = 'https://product.m.360che.com/brandlist.html'

var carMation = {};

superagent.get(baseUrl)

	.end((err,data)=>{
		if(err)console.log(err);

		let topics = [];
		let carList = [];
		let count = 0;

		var $ = cheerio.load(data.text);

		$('.brands-list').each(function(i,element){

			carList.push({list : []});
			carList[i].carlist = $(element).find('header').text();

			$(element).find('li').each(function(j,ele){

				let picSrc = $(ele).find('figure').find('img').attr('.src') ? 
									$(ele).find('figure').find('img').attr('.src') : '';

				let picName = $(ele).find('figcaption').text() ? $(ele).find('figcaption').text().replace(/\s/g,'') : $(ele).find('a').text().replace(/\s/g,'');
				let randomHash = parseInt(Math.random()*1000000  + 1001000);
				
				let finlSrc = './carpic/360che/' + randomHash + '.png';  //最终src

				carList[i].list.push({
					carName:picName,
					carPicSrc : finlSrc,
					realSrc : picSrc
				});

				if(picSrc){
					superagent.get(picSrc).end(function(err,sres){

		                if(err)throw err;

		                //根据访问路径获得文件名称
		                fs.writeFile(finlSrc,sres.body,function(){
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







