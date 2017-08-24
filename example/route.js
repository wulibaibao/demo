const express =require('express');
var server = express();

//目录1:/user/
var routeUser = express.Router();

server.use('/user',routeUser);

routeUser.get('/1.html',function(req,res){
	res.send('user1')
})
routeUser.get('/2.html',function(req,res){
	res.send('user2')
})

//目录2：/article

var articleRouter = express.Router();

server.use('/article',articleRouter);

articleRouter.get('/100.html',function(req,res){
	res.send('dafdsafsf')
})
articleRouter.get('/200.html',function(req,res){
	res.send('01939999')
})

server.listen(3000);