var http = require('http');
var fs = require('fs');
//var url = require('url');

/*var options = {
	key : fs.readFileSync('ssh_key.pem'),
	cert : fs.readFileSync('ssh_cert.pem')
}*/
server = http.createServer(function(req,res){
	res.writeHeader(200,{'Content-Type': 'text/plain;charset=utf-8'})
	res.end('hellow world')
});

server.listen(8080);