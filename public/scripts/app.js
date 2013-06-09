var Todo = Todo || {};

Todo.app = {
	socket: {},
	viewModel: {},

	init: function(socket) {
		this.socket = socket;
		socket.on('connected', function (data) {
			this.items = data.items;
			viewModel = new Todo.ViewModel();
			viewModel.init(this.items);
			ko.applyBindings(viewModel);
		});

		socket.on('taskAdded', function(data) {
			viewModel.taskAdded(data.task);
		});

		socket.on('taskCompleteStatusChanged', function(data) {
			viewModel.taskCompleteStatusChanged(data.id, data.completed);
		});

		socket.on('taskSortChanged', function(data) {
			viewModel.taskSortChanged(data.items);
		});
		
	},

	addTask: function(taskText) {
		this.socket.emit('addTask', { name: taskText });
	},

	toggleComplete: function(id) {
		this.socket.emit('toggleComplete', { id: id });
	},

	prioDown: function(id) {
		this.socket.emit('prioDown', { id: id });
	},

	prioUp: function(id) {
		this.socket.emit('prioUp', { id: id });
	}
}