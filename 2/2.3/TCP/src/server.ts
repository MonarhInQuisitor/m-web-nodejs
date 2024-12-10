var net = require('net');

var server = net.createServer(function(socket: any) {
	

	socket.pipe(socket);// alwats return text back to client

	socket.on('data', (data : any) => {
        console.log('Received from client:', data.toString());
		console.log("Client's IP "+ socket.remoteAddress  )
		console.log(new Date())
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (err:any) => {
        console.error('Socket error:', err);
    });
});

server.listen(3000, '127.0.0.1',()=>{
	console.log("server running")
});
server.on('error', (err:any) => {
    console.error('Server error:', err);
});