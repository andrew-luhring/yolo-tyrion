var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
  response.writeHead(200);
  //var callback = function(err, contents){
  //response.write("derp derp derp");
  //response.end();
  //}
  //  fs.readFile('index.html', callback);
  response.write("derp derp derp");  
response.end();
}).listen(8080);
