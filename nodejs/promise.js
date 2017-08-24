// async function getStockPriceByName(name) {
//   var symbol = await getStockSymbol(name);
//   var stockPrice = await getStockPrice(symbol);
//   return stockPrice;
// }

// getStockPriceByName('goog').then(function (result) {
//   console.log(result);
// });


var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var i = 1;
var limt = 10; //爬取文章篇数
var next_start = 0;
var url = "http://www.duitang.com/napi/blog/list/by_filter_id/?filter_id=%E4%BA%BA%E7%89%A9%E6%98%8E%E6%98%9F&start=" + next_start;
//初始url

function fetchPage(url) { //封装了一层函数
    startRequest(url);
}


function startRequest(url) {
    //采用http模块向服务器发起一次get请求
    http.get(url, function(res) {
        var html = ''; //用来存储请求网页的整个html内容
        var titles = [];
        res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on('data', function(chunk) {
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数    
        res.on('end', function() {
            var $ = cheerio.load(html); //采用cheerio模块解析html
            savedImg($); //存储每篇文章的图片及图片标题
            
            if (i <= limt) {
                i++;
                // console.log(next_start)
                url = "http://www.duitang.com/napi/blog/list/by_filter_id/?filter_id=%E4%BA%BA%E7%89%A9%E6%98%8E%E6%98%9F&start=" + next_start
                fetchPage(url);
            }
        });
    }).on('error', function(err) {
        console.log(err);
    });
}

//该函数的作用：在本地存储所爬取到的图片资源
function savedImg($) {
    var res = JSON.parse($.text());
    next_start = res.data.next_start;
    res.data.object_list.forEach(function(v, k) {
        var img_src = v.photo.path;
        var geshi = img_src.split('.').pop();
        var mingzi = v.msg.length > 20 ? v.msg.substring(0, 20) : v.msg;
        img_filename = mingzi + '.' + geshi;
        console.log(img_src)
        console.log(img_filename)
        //采用request模块，向服务器发起一次请求，获取图片资源
        request.head(img_src, function(err, res, body) {
            if (err) {
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream('./image/' + img_filename)); //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
    });
}

fetchPage(url); //主程序开始运行