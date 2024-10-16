// цей файл потрібно буде дописати...

// не звертайте увагу на цю функцію 
// вона потрібна для того, щоб коректно зчитувати вхідні данні
function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10) 
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

// ось цю функцію, власне, і треба написати
function parseTcpStringAsHttpRequest(string) { 

let method = string.match(/^GET|^POST/).shift();
let url = string.match(/\/[\/\w\?=,]+/).shift()
let headers = string.match(/.+:.+/g) ? string.match(/.+:.+/g).map(el=>el.split(":").map(el=>el.trim())).reduce((sum,curr)=>{
sum[curr[0]]=curr[1] 
return sum
},{}): null
let body = string.match(/.+&.+/)?string.match(/.+&.+/).shift():null
  return { 
    method: method, 
    uri : url, 
    headers:  headers, 
    body :body, 
  }; 
}
function outputHttpResponse(statusCode, statusMessage, headers, body) {
  console.log(`HTTP/1.1 ${statusCode} ${statusMessage}
${Object.keys(headers).reduce((sum,curr)=>{
sum=sum+`${curr} : ${headers[curr]} \n`
return sum
   },"")}
${body}`);
}
//1.2.3
function processHttpRequest($method, $uri, $headers, $body) {
  let sum = $uri.slice($uri.indexOf("=")+1).split(",").reduce((sum,curr)=>{return sum=sum+curr*1},0)+""//*1 It's parse to Int
  let headers={
    Date: new Date,
    Server: "Apache/2.2.14 (Win32)",
"Content-Length": sum.length,
Connection: "Closed",
"Content-Type": "text/html; charset=utf-8"
  }
 if($method==="GET"&&(/\/sum\?nums=[\d,]+/).test($uri)){
  outputHttpResponse(200,"OK",headers,sum)
 }
 else if(!$uri.includes("/sum")){
  outputHttpResponse(404,"Not Found",headers,"not found")
 }else if($method!=="GET"||!$uri.includes("?nums=")){
  outputHttpResponse(400,"Bad Request",headers,sum)
 }

  // ... проаналізувати вхідні дані, обчислити результат
  // та спеціальною командою красиво вивести відповідь

}

http = parseTcpStringAsHttpRequest(contents); 
processHttpRequest(http.method, http.uri, http.headers, http.body);
