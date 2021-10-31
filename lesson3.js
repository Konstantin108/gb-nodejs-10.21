const fs = require('fs');
const ACCESS_LOG = './access.log';
const fsPromises = require('fs.promises');

//----------методы чтения из файла----------

// const data = fs.readFileSync(ACCESS_LOG,{     <-- синхронный режим
//     encoding: 'utf-8'
// });
//
// console.log(data);

// fs.readFile(ACCESS_LOG, 'utf-8', (err, data) => {     //<-- асинхронный режим
//     if (err) console.log(err);
//     else console.log(data);
// });

// fsPromises.readFile(ACCESS_LOG, 'utf-8')     //<-- fs промисы
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// const foo = async () => {
//     try {
//         const data = await fsPromises.readFile(ACCESS_LOG, 'utf-8');     //<-- применение async await
//         console.log(data);
//     } catch (e) {
//         console.log(e)
//     }
// };
//
// foo();

//----------методы записи в файл----------

const requests = [
    `127.0.0.1 - - [25/05/2021] "GET /foo HTTP/1"`,
    `127.0.0.1 - - [25/05/2021] "POST /foo HTTP/1"`
];

fs.writeFile(                //<-- асинхронный режим записи
    ACCESS_LOG,
    requests[0] + '\n',
    {
        encoding: 'utf-8',
        flag: 'a'                //<-- a - append - добавить содержимое, без полной перезаписи
    },
    (err) => {
        if (err) console.log(err);
    }
);

fs.appendFile(                //<-- асинхронный режим (вариант №2)
    ACCESS_LOG,
    requests[0] + '\n',
    {
        encoding: 'utf-8'
    },
    (err) => {
        if (err) console.log(err);
    }
);