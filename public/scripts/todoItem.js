TodoItem = function TodoItem(id, taskText, color, completed) {
    var that = this;
    that.id = id;
    that.text = taskText;
    that.color = color;
    that.completed = ko.observable(completed);
}

