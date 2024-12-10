import dgram from 'dgram';

const HOST = '0.0.0.0';
const PORT = 3000;
const message = 'My KungFu is Good!';
const client = dgram.createSocket('udp4');
let start =performance.now();

client.send(message, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
   
});

client.on('message',(msg,rinfo)=>{
    console.log(`Client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    if(message===msg.toString()){
        console.log("THE SAME")
    }else{
        console.log("NOT THE SAME")
    }
    console.log( performance.now()- start)
    client.close();
})