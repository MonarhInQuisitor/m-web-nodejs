import http from 'http';
 const  text = 'hello world'

  const time = performance.now();
let options = {
    hostname: 'localhost',
    port: 3000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': text.length
    }
};

let client = http.request(options, function (res : any) {
    let body=""
    console.log('STATUS:', res.statusCode);
    console.log('HEADERS:', JSON.stringify(res.headers));

    res.on('data', function (chunk : any) {
        console.log('BODY:', chunk.toString());
        body=body+chunk
    });

    res.on('end', function () {
        if( body===text){
            console.log('The same');
        }else{
            console.log('not the same');
        }
        console.log(performance.now()-time)
    });
});

client.on('error', function (e : any) {
    console.log('Problem with request:', e.message);
});

client.write( text)
client.end( );