var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

server.listen(process.env.PORT || 3000);

var messages = [];

io.on('connection', function(client){
  console.log('A user connected!');
  client.emit('initialize', messages);
  client.on('message', function(data){
    console.log('message recieved', data);
    messages.push(data);
    client.broadcast.emit('message', data);
  })
});
