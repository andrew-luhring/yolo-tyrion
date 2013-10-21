/**
 * @author Andrew S Luhring
 */
//echo request:
//version1:
var http = require('http'); //require http module.

/*
http.createServer(function(request, response){
	response.writeHead(200);
	resquest.on('data', function(chunk){
		response.write(chunk);
	});
	request.on('end', function(){
		response.end();
	});
}).listen(8080);*/



/*
//sortened version ^:
http.createServer(function(request, response){
	response.writeHead(200);
	request.pipe(response);
}).listen(8080);



//read a file, write file 1 to another file. similar to cat file.blah > file2.blah or cat file.blah | grep "blah"
var file = fs.createReadStream("index.html");
var newFile = fs.createWriteStream("index-copy.html");
file.pipe(newFile);

*/
//combined ^^^
/*
var fs = require('fs'); //require filesystem module
var http = require('http'); //require http module.
http.createServer(function(request, response){
	var newFile = fs.createWriteStream('index-copy.html');
	request.pipe(newFile);
	request.on('end', function(){
		response.end('swag!');
	});
}).listen(8080);
*/
//dicking around vv

var fs = require('fs'); //require filesystem module.
var http = require('http'); //require http module.
var util = require('util');

http.createServer(function(request, response){
	var oldFile = fs.createReadStream("../index.html");
	var newFile = fs.createWriteStream("index.html");
	oldFile.pipe(newFile);
	response.writeHead(200);
	//fs.writeFile('index.html',  );
	response.end();
	request.on('end', function(){
		response.end(newFile);
	});
}).listen(8080);



