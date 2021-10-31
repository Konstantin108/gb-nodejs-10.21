const fs = require('fs');
const {Transform} = require('stream');
const ACCESS_LOG = './access.log';
const fsPromises = require('fs.promises');

//----------чтение потока----------

// const readStream = fs.createReadStream(
//     ACCESS_LOG,
//     {
//         flags: 'r',
//         encoding: 'utf-8',
//         // autoClose
//         // start
//         // end
//         highWaterMark: 128,             //<-- размер в байтах
//     }
// );

// readStream.on('open', () => {
//     console.log('File opened');
// });
// readStream.on('data', (chunk) => {
//     console.log('Get chunk', chunk);
// });
// readStream.on('end', () => {
//     console.log('Finished');
// });
// readStream.on('error', (err) => {
//     console.log('wrong!', err);
// });
// readStream.on('find', (logString) => {             //<-- не знаю как сделать чтение по строкам
//     console.log('logString!', logString);             //<-- readStream - изучить методы
// });

//----------запись потока----------

// const requests = [
//     `127.0.0.1 - - [25/05/2021] "GET /foo HTTP/1"`,
//     `127.0.0.1 - - [25/05/2021] "POST /foo HTTP/1"`
// ];
//
// const writeStream = fs.createWriteStream(
//     ACCESS_LOG,
//     {
//         encoding: 'utf-8',
//         flags: 'a'
//     }
// );
//
// requests.forEach(logString => {
//     writeStream.write(logString + '\n');
// });
//
// writeStream.on('end', () => {
//     console.log('end');
// });
// writeStream.end(() => {             //<-- подписка на событие (альтернативная запись)
//     console.log('end');
// });

const payedAccount = false;
const readStream = fs.createReadStream(ACCESS_LOG);    //<-- запись из одного файла в другой
const tStream = new Transform({
    transform(chunk, encoding, callback) {
        if (payedAccount) this.push(chunk);
        else {
            const transformed = chunk.toString().replace(/\d+\.\d+\.\d+\.\d+/g, '[IP was hidden]');
            this.push(transformed);
        }
        callback();
    }
});

readStream.pipe(tStream).pipe(process.stdout);