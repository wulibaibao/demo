const fs = require('fs');

var app = require('http').createServer((req,res) =>{
	fs.readFile(__dirname + '/index.html',(err,data)=>{
		if(err){
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200);
		res.end(data);
	})
});

var io = require('socket.io')(app);

var talkMessages = {};
talkMessages.messages = [];

app.listen(80||process.env.PORT,'0.0.0.0');

io.on('connection',(socket)=>{
	socket.emit('news',{ok:'config ok'});
	socket.on('my other event',(data)=>{

		console.log(data);
		console.log(talkMessages);

		talkMessages.messages.push(data.message)
		socket.emit('news',talkMessages);
		
	})
})