var Todo = Todo || {};

Todo.ViewModel = function () {
    var that = this;

    that.todoItems = ko.observableArray([]);
    that.colors = ko.observableArray([0,1,2,3,4,5,6]);
    that.selectedColor = ko.observable(0);
	that.newTaskText = ko.observable();

    that.init = function(initalTasks) {
		
    	var mapped = ko.utils.arrayMap(initalTasks, function(task) {
	        return that.mapTask(task);
	    });

		that.todoItems(mapped);
    };

	that.backgroundColor = function(data, event) {
		return "task rainbow" + data.color;
	};

    that.selectColor = function(data, event) {
        that.selectedColor(data);
    }

	that.toggleComplete = function(data, event) {
		Todo.app.toggleComplete(data.id);
	};

    that.prioDown = function(data, event) {
        Todo.app.prioDown(data.id);
    }

    that.prioUp = function(data, event) {
        Todo.app.prioUp(data.id);
    }

    that.addTask = function() {
        var taskToAdd = this.newTaskText();

        if(taskToAdd.length === 0) return;

        Todo.app.addTask(this.newTaskText(), this.selectedColor());
        that.newTaskText("");
    };

    that.taskAdded = function(task) {
		that.todoItems.push(that.mapTask(task));
    };

    that.taskCompleteStatusChanged = function(id, completed) {
        var task = ko.utils.arrayFirst(that.todoItems(), function(task) {
            return task.id === id;
        });

        task.completed(completed);
    };

    that.taskSortChanged = function(tasks) {
        var mapped = ko.utils.arrayMap(tasks, function(task) {
            return that.mapTask(task);
        });

        that.todoItems(mapped);
    }

    that.mapTask = function(task) {
        return new TodoItem(task.id, task.text, task.color, task.completed);
    };
}