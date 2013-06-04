TodoItem = function TodoItem(id, taskText, completed) {
    var that = this;
    that.id = id;
    that.text = taskText;
    that.completed = ko.observable(completed);
}

