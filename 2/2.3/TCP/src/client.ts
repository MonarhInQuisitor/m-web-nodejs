var net = require('net');
const TEXT = "Hello, server! Love, Client."
var client = new net.Socket();
let time = performance.now();
client.connect(3000, '127.0.0.1', function() {
	console.log('Connected');
	client.write(TEXT);
});

client.on('data', function(data: String) {
	console.log('Received: ' + data);
	console.log("recive a messege")
	if(data.toString()===TEXT){
		console.log("THE SAME")
	}else{
		console.log("NOT THE SAME")
	}
	console.log(performance.now()-time)
	client.end()
    
});

client.on('close', function() {
	console.log('Connection closed');
});