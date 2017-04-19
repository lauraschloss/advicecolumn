var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

server.listen(process.env.PORT || 3000);

var alldata = {
	messages: [],
	helptext: '',
	title: ''
}

io.on('connection', function(client){
  console.log('A user connected!');
  client.emit('initialize', alldata);
  client.on('message', function(data){
    console.log('message recieved', data);
    if (data.message) {
	    alldata.messages.push(data);
	} else if (data.title) {
		alldata.messages = [];
		alldata.title = data.title;
		alldata.helptext = data.helptext;
	}
    client.broadcast.emit('message', data);
  })
});
