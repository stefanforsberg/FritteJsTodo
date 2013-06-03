var items = [];
var id = 0;

function TodoItem(taskText) {
    var that = this;
    that.id = id++;
    that.text = taskText;
    that.completed = false;
}

exports.TodoList = function(io) {
	
	items.push(new TodoItem("Task 1"));
	items.push(new TodoItem("Task 2"));

	io.sockets.on('connection', function (socket) {
		socket.emit('connected', {'items': items});

		socket.on('addTask', function (data) {
			var newTask = new TodoItem(data.name)
			items.push(newTask);
			addTask(socket, newTask);
		});

		socket.on('toggleComplete', function (data) {

			for (i=0;i<items.length;i++){
           		if (items[i].id === data.id ) {
   					items[i].completed = !items[i].completed;
       			}
        	}

			toggledComplete(socket, data.id);
		});
	});

	addTask = function(socket, task) {
		socket.emit('taskAdded', {'task': task});
		socket.broadcast.emit('taskAdded', {'task': task});
	}

	toggledComplete = function(socket, id) {
		socket.emit('toggledComplete', {'id': id});
		socket.broadcast.emit('toggledComplete', {'id': id});
	}
}