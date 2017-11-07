var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//app.use(express.static(__dirname + '/node_modules')); 

app.get('/', function(req, res,next) {  
    //res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('scc', function(data) {
	console.log("\nData Received: ", data);
    	client.broadcast.emit('module_data', data);
    });
});

server.listen(3000);
