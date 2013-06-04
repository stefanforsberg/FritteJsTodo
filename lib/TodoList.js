var us = require('underscore'),
	tasks = [],
	id = 0;

function TodoItem(taskText) {
    var that = this;
    that.id = id++;
    that.text = taskText;
    that.completed = false;
}

exports.TodoList = function(io) {

	io.sockets.on('connection', function (socket) {
		socket.emit('connected', {'items': tasks});

		socket.on('addTask', function (data) {
			var newTask = new TodoItem(data.name)
			tasks.push(newTask);
			taskAdded(socket, newTask);
		});

		socket.on('toggleComplete', function (data) {

			var taskToGoggle = us.find(tasks, function(task) {
				return task.id === data.id;
			});

			taskToGoggle.completed = !taskToGoggle.completed

			taskCompleteStatusChanged(socket, taskToGoggle.id, taskToGoggle.completed);
		});
	});

	taskAdded = function(socket, task) {
		socket.emit('taskAdded', {'task': task});
		socket.broadcast.emit('taskAdded', {'task': task});
	}

	taskCompleteStatusChanged = function(socket, id, completed) {
		socket.emit('taskCompleteStatusChanged', {'id': id, 'completed': completed});
		socket.broadcast.emit('taskCompleteStatusChanged', {'id': id, 'completed': completed});
	}
}