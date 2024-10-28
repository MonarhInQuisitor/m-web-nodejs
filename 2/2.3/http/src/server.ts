import http from 'http';

let server = http.createServer().listen(3000);

server.on('request', function (req : any , res : any) {
    let body=""

    req.on('data', function (data : any) {
   
        body += data;
    });

    req.on('end', function () {
        console.log("get a request")
        res.writeHead(200);
        res.end(body);
        console.log(req.socket.remoteAddress)
        getIp().then(rs=>console.log(rs))  // adress of server
        console.log(body)
        console.log(new Date().getHours() , new Date().getMinutes() , new Date().getSeconds()); 
    });
});
 server.on("error",(error)=>{
    console.log(error)
 })
console.log('Listening on port 3000');

async function getIp() {
    return await fetch(`https://api.ipify.org?format=json`).then(res=>res.json()).then(res=>res.ip)
}