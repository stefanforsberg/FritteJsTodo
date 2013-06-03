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

		socket.on('toggledComplete', function(data) {
			viewModel.toggledComplete(data.id);
		});
	},

	addTask: function(taskText) {
		this.socket.emit('addTask', { name: taskText });
	},

	toggleComplete: function(id) {
		this.socket.emit('toggleComplete', { id: id });
	}
}