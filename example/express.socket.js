const express = require('express');
const expressStatic = require('express-static');
const webSocket = require('socket.io');

var server = express();

server.use(expressStatic('./'));

server.listen(3000 || process.env.PORT);

server.use('/',(req,res)=>{
	res.send({'config':'ok'});
	res.end();
});

var io = webSocket.listen(server);

io.on('connection',(socket)=>{

	socket.emit('news',{ok:'config ok'});
	socket.on('my other event',(data)=>{

		console.log(data);
		console.log(talkMessages);

		talkMessages.messages.push(data.message)
		socket.emit('news',talkMessages);
	})

})

