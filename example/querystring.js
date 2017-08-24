const http = require('http');

const querystring = require('querystring');

const liburl = require('url');

http.createServer(function (req, res){
  
    var GET = {};
    console.log(req.url);

    var obj = liburl.parse(req.url,true);

    console.log(obj.query);

    if(req.url.indexOf('?') != -1){
      
      

      var arr = req.url.split('?');
      var url = arr[0];
      
      GET = querystring.parse(arr[1]);
    
    }else{
      
      var url=req.url;
    
    }

    console.log(url, GET);
    
    res.write('success');
    
    //req获取前台请求数据
    
    res.end();

}).listen(3000);
