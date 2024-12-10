import dgram from 'dgram';
const server = dgram.createSocket('udp4');

const HOST = '0.0.0.0';
const PORT = 3000;

server.on('error', (err ) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg , rinfo ) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port} in ${new Date}`);
    server.send(msg, rinfo.port, rinfo.address, (err) => {
        if (err) console.log('Error sending response:', err);
    });
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(PORT,HOST);