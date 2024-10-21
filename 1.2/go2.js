// цей файл потрібно буде дописати...

// не звертайте увагу на цю функцію 
// вона потрібна для того, щоб коректно зчитувати вхідні данні
function readHttpLikeInput() {
  var fs = require("fs");
  var res = "";
  var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
  let was10 = 0;
  for (; ;) {
    try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
    if (buffer[0] === 10 || buffer[0] === 13) {
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
  let url = string.match(/\/[^\s]*/).shift()
  let headers = string.match(/.+:.+/g) ? string.match(/.+:.+/g).map(el => el.split(":").map(el => el.trim())).reduce((sum, curr) => {
    sum[curr[0]] = curr[1]
    return sum
  }, {}) : null
  let body = string.match(/.+&.+/) ? string.match(/.+&.+/).shift() : null
  return {
    method: method,
    uri: url,
    headers: headers,
    body: body,
  };
}
function outputHttpResponse(statusCode, statusMessage, headers, body) {
  console.log(`HTTP/1.1 ${statusCode} ${statusMessage}
${Object.keys(headers).reduce((sum, curr) => {
    sum = sum + `${curr} : ${headers[curr]} \n`
    return sum
  }, "")}
${body}`);
}
//1.2.3
/*function processHttpRequest($method, $uri, $headers, $body) {
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
  */


// ... проаналізувати вхідні дані, обчислити результат
// та спеціальною командою красиво вивести відповідь
//1.2.4
//function processHttpRequest($method, $uri, $headers, $body) {

 // let body = ""
 // let loginPassword = $body.match(/(?<==)[^& \n]*/g)
 /* let statusCode;
  let statusMessage;
  let pass;
  if (require("fs").existsSync("passwords.txt")) {//if document is exist
    console.log("123142523534643564567")
    pass = require("fs").readFileSync("passwords.txt").toString()
    if (pass.includes(`${loginPassword[0]}:${loginPassword[1]}`)) {
      body = `<h1 style="color:green">FOUND</h1>`;
      statusCode = 200;
      statusMessage = "OK"
    } else {
      body = `<h1 style="color:red">NOT FOUND</h1>`;
      statusCode = 404;
      statusMessage = "Not Found"
    }
    let headers = {
      Server: "Apache/2.2.14 (Win32)",
      "Content-Length": body.length,
      Connection: "Closed",
      "Content-Type": "text/html; charset=utf-8"
    }
  }
  else {
    body = `<h1 style="color:blavk">Internal Server Error</h1>`;
    statusCode = 500;
    statusMessage = "Internal Server Error"
  }
  let headers={
    Server: "Apache/2.2.14 (Win32)",
"Content-Length": body.length,
Connection: "Closed",
"Content-Type": "text/html; charset=utf-8"
  }
  outputHttpResponse(statusCode, statusMessage, headers, body)
  // outputHttpResponse(400,"Bad Request",headers,sum)
}*/
//1.2.5
function processHttpRequest($method, $uri, $headers, $body) {
  let statusCode = 200;
  let statusMessage = "OK";
  let body="";
  //----
  if($uri==="/"){
    $uri = "index.html"
  }else{ //if url is normal than teplace first /
    $uri = $uri.replace("/","")
  }
  //----
  let file="";
  if($headers.Host==="student.shpp.me"){
     file = "student/"
  }else if($headers.Host==="another.shpp.me"){
     file = "another/"
  }else{
       file = "else/"
  }
  $uri = file +  $uri;
  //----
    if(require("fs").existsSync($uri)){//if file soesn't exist
      body = require("fs").readFileSync($uri).toString()
    }else{
      statusCode = 404;
      statusMessage = "NOT FOUND";
    }
    //----
  let headers={
    Server: "Apache/2.2.14 (Win32)",
"Content-Length": body.length,
Connection: "Closed",
"Content-Type": "text/html; charset=utf-8"
  }
  outputHttpResponse( statusCode,statusMessage,headers,body)
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);
