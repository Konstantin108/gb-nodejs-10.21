const http = require('http');
const url = require("url");
const path = require("path");
const fs = require('fs');
const cluster = require('cluster');
const os = require('os');

// const server = http.createServer((req, res) => {

// console.log('url:', req.url);
// console.log('method:', req.method);
// console.log('headers:', req.headers);

// res.setHeader('x-server', 'my server');           <-- работа с хедерами
// res.writeHead(200, 'OK', {
//     'custom-header': 'test'
// });

//URL
// if (req.url === '/user') {           <-- работа с урлами
//     res.write('user found');
//     res.end();
// } else {
//     res.writeHead(404, 'not found', {
//         'custom-header': 'test2'
//     });
//     res.write('user not found');
//     res.end();
// }

//METHOD
// if (req.method === 'GET') {           <-- работа с методами
//     res.write('hello it is GET method');
//     res.end();
// } else {
//     res.writeHead(405, 'not allowed', {
//         'custom-header': 'test for method GET'
//     });
//     res.write('method not allowed');
//     res.end();
// }

// const {query} = url.parse(req.url, true);
// console.log(query);

// if (req.method === 'POST') {           <-- работа c реквестом и респунсом
//     let data = '';
//     req.on('data', chunk => data += chunk);
//     req.on('end', () => {
//         const parsedData = JSON.parse(data);
//         console.log(data);
//         console.log(parsedData);
//         res.writeHead(200, 'ok', {
//             'Content-Type': 'application/json'
//         });
//         res.end(data);
//     });
// } else {
//     res.end();
// }

// const filePath = path.join(__dirname, './index.html');           <-- работа c HTML
// const readStream = fs.createReadStream(filePath);
// res.writeHead(200, 'OK', {
//     'Content-Type': 'text/html'
// });
// readStream.pipe(res);


// });
//
// server.listen(5555);

if (cluster.isMaster) {
//     cluster.fork();
    console.log(`master process ${process.pid} is running...`);
    for (let i = 0; i < os.cpus().length; i++) {
        console.log(`forking process number ${i}`);
        cluster.fork();
    }
} else {
    console.log(`worker ${process.pid} is running`);
    const server = http.createServer((req, res) => {
        const filePath = path.join(__dirname, './index.html');
        const readStream = fs.createReadStream(filePath);

        setTimeout(() => {
            console.log(`worker ${process.pid} handling request`);
            res.writeHead(200, 'OK', {
                'Content-Type': 'text/html'
            });
            readStream.pipe(res);
        }, 5000);
    }).listen(5555);

}