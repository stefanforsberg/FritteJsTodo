var us = require('underscore'),
	tasks = [],
	id = 0;

function TodoItem(taskText, color) {
    var that = this;
    that.id = id++;
    that.color = color;
    that.sort = that.id;
    that.text = taskText;
    that.completed = false;
}

exports.TodoList = function(io) {

	io.sockets.on('connection', function (socket) {
		socket.emit('connected', {'items': tasks});

		socket.on('addTask', function (data) {
			var newTask = new TodoItem(data.name, data.color)
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

		socket.on('prioDown', function (data) {
			var index = indexOfTaskToPrio(data.id);

			tasks[index].sort++;
			tasks[index+1].sort--;

			taskPrioChanged(socket);
		});

		socket.on('prioUp', function (data) {
			var index = indexOfTaskToPrio(data.id);

			tasks[index].sort--;
			tasks[index-1].sort++;

			taskPrioChanged(socket);
		});
	});

	indexOfTaskToPrio = function(id) {
		var taskToPrio = us.find(tasks, function(task) {
			return task.id === id;
		});

		return us.indexOf(tasks, taskToPrio);
	};

	taskPrioChanged = function(socket) {
		tasks = us.sortBy(tasks, function(item){ return item.sort; });

		socket.emit('taskSortChanged', {'items': tasks});
		socket.broadcast.emit('taskSortChanged', {'items': tasks});
	};

	taskAdded = function(socket, task) {
		socket.emit('taskAdded', {'task': task});
		socket.broadcast.emit('taskAdded', {'task': task});
	};

	taskCompleteStatusChanged = function(socket, id, completed) {
		socket.emit('taskCompleteStatusChanged', {'id': id, 'completed': completed});
		socket.broadcast.emit('taskCompleteStatusChanged', {'id': id, 'completed': completed});
	};
}