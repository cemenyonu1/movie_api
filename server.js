const http = require('http'),
fs = require('fs'),
url = require('url');

http.createServer((request, response) => {
    let addr = request.url,
    q = new URL(addr, 'http://' + request.headers.host),
    filepath = '';

    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if(err){
            console.log(err);
        } else {
            console.log('Added to log.');
        }
    });

    if(q.pathname.includes('documentation')){
        filepath = (__dirname + '/documentation.html');
    } else {
        filepath = 'index.html';
    };
    fs.readFile(filepath, (err, data) => {
        if(err) {
            throw(err);
        }
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(data);
        response.end('Hello Node!\n');
    });
}).listen(8080);
console.log('My first Node test is running on Port 8080'); 