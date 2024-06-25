const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
var port;
const server = http.createServer();
/*const server = http.createServer(function(req,res){
	
});*/
const wss = new WebSocket.Server({ server });
 const readline=require("readline");
 const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

 rl.question("Enter Port Number : ",function(input){
	port=input;
	rl.close();
	server.listen(port);
	console.log("Listening on "+port);
 });
 
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});

  
  