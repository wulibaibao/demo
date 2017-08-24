/**
 * Created by sun on 2017/3/23.
 */
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const url = require('url');

var server = http.createServer(function(req,res){

    var obj = url.parse(req.url,true);
    var objUrl = obj.pathname;
    var GET = obj.query;
    var str = '';
    var i = 0;

    req.on('data',function(data){
        console.log(`第${i++}次握手`);
        str += data;
    })
    req.on('end',function(){
        var post  = querystring.parse(str);
        console.log(GET,post,objUrl);
    })

    console.log(__dirname)

}).listen(8080);

console.log(__dirname)