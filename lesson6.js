const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');
const faker = require('faker');

const server = http
    .createServer(((req, res) => {
        const indexPath = path.join(__dirname, './index_lesson6.html');
        const readStream = fs.createReadStream(indexPath);

        readStream.pipe(res);
    }));

const io = socket(server);

io.on('connection', (client) => {     //<-- событие реагирует на подключение клиента
    let countClients = io.engine.clientsCount;
    client.name = faker.fake(faker.fake("{{name.firstName}} {{name.lastName}}"));
    client.broadcast.emit('count_connection', countClients);
    client.emit('my_count_connection', countClients);
    client.broadcast.emit('new_connect', client.name);
    client.emit('my_connect', client.name);
    client.on('client-msg', (data) => {     //<-- подписка на сообщение от клиента
        const payload = {
            message: data.message,    //<-- возвращаем сообщение
            clientName: client.name
        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-my-msg', payload);
    });

    client.on("disconnecting", () => {
        client.broadcast.emit('left', client.name);
        countClients = io.engine.clientsCount;
        client.broadcast.emit('count_connection_disconnect', countClients);
        client.emit('my_count_connection_disconnect', countClients);
    });

    client.on("reconnect", () => {
        client.broadcast.emit('connect-problem', client.name);
        client.emit('my-connect-problem');
    });
});

server.listen(5555);

