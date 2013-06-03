var io = require('socket.io'),
    http = require('http'),
    express = require('express'),
    lessMiddleware = require('less-middleware');

var port = process.env.port || 8090;

var app = express();
var server = http.createServer(app);

// app.use(express.static(__dirname + "/public"));

app.configure(function(){
  
  app.use(lessMiddleware( {
    src      : __dirname + "/public",
    compress : true
  }));
  app.use(express.static(__dirname + '/public'));
});

io = io.listen(server);

io.configure(function () {
   io.set('log level', 2);
})

server.listen(port);

require('./lib/ToDoList.js').TodoList(io);