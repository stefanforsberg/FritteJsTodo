var Todo = Todo || {};

Todo.ViewModel = function () {
    var that = this;

    that.todoItems = ko.observableArray([]);
	that.newTaskText = ko.observable();

    that.init = function(initalTasks) {
		
    	var mapped = ko.utils.arrayMap(initalTasks, function(task) {
	        return that.mapTask(task);
	    });

		that.todoItems(mapped);
    };

	that.backgroundColor = function(index) {
		var i = index();

		while(i >= 7) {
			i-=7;
		}

		return "rainbow rainbow" + i;
	};

	that.toggleDone = function(data, event) {
		Todo.app.toggleComplete(data.id);
	};

    that.addTask = function() {
        Todo.app.addTask(this.newTaskText());
        that.newTaskText("");
    };

    that.taskAdded = function(task) {
		that.todoItems.push(that.mapTask(task));
    };

    that.toggledComplete = function(id) {
		for (i=0;i<that.todoItems().length;i++){
       		if (that.todoItems()[i]().id === id ) that.todoItems()[i]().toggleCompleted();
    	}
    };

    that.mapTask = function(task) {
    	return ko.observable(new TodoItem(task.id, task.text, task.completed));
    };
}