var io = require('socket.io');
var http = require('http');
var express = require('express');

var port = process.env.port || 8090;

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + "/public"));

io = io.listen(server);

io.configure(function () {
   io.set('log level', 2);
})

server.listen(port);

require('./lib/ToDoList.js').TodoList(io);