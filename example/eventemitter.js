var events = require('events');

var eventEmitter = new events.EventEmitter();

eventEmitter.on('some_event',()=>{
	console.log('some_event  事件触发')
})

setTimeout(()=>{
	eventEmitter.emit('some_event')
},1000);

eventEmitter.on('someEvent',(arg1,arg2)=>{
	console.log('listener1',arg1,arg2);
})
eventEmitter.on('someEvent',(arg1,arg2)=>{
	console.log('listener2',arg1,arg2);
})

eventEmitter.emit('someEvent','15','13')

/*
	addListener(event, listener)
	为指定事件添加一个监听器到监听器数组的尾部。
	
	on(event, listener)
	为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
server.on('connection', function (stream) {
  console.log('someone connected!');
});

	once(event, listener)
	为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
server.once('connection', function (stream) {
  console.log('Ah, we have our first user!');
});
	
	removeListener(event, listener)
	移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。
它接受两个参数，第一个是事件名称，第二个是回调函数名称。
var callback = function(stream) {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
	
	removeAllListeners([event])
	移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
	
	setMaxListeners(n)
	默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。
	
	listeners(event)
	返回指定事件的监听器数组。
	
	emit(event, [arg1], [arg2], [...])
	按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。

	*/