var items = ["Item 1", "item 2"];

exports.TodoList = function(io) {
	
	io.sockets.on('connection', function (socket) {
		console.log(items);
		socket.emit('connected', {'items': items});

		socket.on('addTask', function (data) {
			items.push(data.name);
			sendTasks(socket);
		});

		// socket.on('a', function () {
		// 	world.Events.action(socket);
		// });

		// socket.on('cu', function (data) {
		// 	world.Events.moved(socket, data);
		// });

		// socket.on('cm', function (data) {
		// 	world.Events.moved(socket, data);
		// });
	});

	sendTasks = function(socket) {
		socket.emit('tasks', {'items': items});
		socket.broadcast.emit('tasks', {'items': items});
	}

}