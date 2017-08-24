const async = require('async');
const superagent = require('superagent');
const cheerio = require('cheerio');


var urls = [];
for(var i = 0; i < 30; i++) {
  urls.push('http://datasource_' + i);
}

// 并发连接数的计数器
var concurrencyCount = 0;
var fetchUrl = function (url, callback) {
  // delay 的值在 2000 以内，是个随机的整数
  var delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrencyCount++;
  console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
  setTimeout(function () {
    concurrencyCount--;
    callback(null, url + ' html content');
  }, delay);
};

async.mapLimit(urls, 5, function (url, callback) {
  	fetchUrl(url, callback);
}, function (err, result) {
	  console.log('final:');
	  console.log(result);
});