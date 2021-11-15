const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http
    .createServer(((req, res) => {
        const indexPath = path.join(__dirname, './index_lesson6.html');
        const readStream = fs.createReadStream(indexPath);

        readStream.pipe(res);
    }));

const io = socket(server);

io.on('connection', client => {     //<-- событие реагирует на подключение клиента
    console.log(client.id);
    client.on('client-msg', data => {     //<-- подписка на сообщение от клиента
        const payload = {
            message: data.message    //<-- возвращаем сообщение
        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
});

server.listen(5555);