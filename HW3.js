const fs = require('fs');
const readLine = require('readline');
const ACCESS_LOG = './access3.log';
const fileData1 = './89.123.1.41_requests.log';
const fileData2 = './34.48.240.111_requests.log';

const writeStream1 = fs.createWriteStream(
    fileData1,
    {
        encoding: 'utf-8',
        flags: 'a'
    }
);

const writeStream2 = fs.createWriteStream(
    fileData2,
    {
        encoding: 'utf-8',
        flags: 'a'
    }
);

let arr = ['89.123.1.41', '34.48.240.111'];

const getLine = readLine.createInterface({
    input: fs.createReadStream(
        ACCESS_LOG,
        {
            encoding: 'utf-8'
        }
    )
});

getLine.on('line', (line) => {
        let mass1 = '';
        let mass2 = '';
        for (let i = 0; i < arr.length; i++) {
            mass1 = arr[0];
            mass2 = arr[1];
        }
        if (line.includes(mass1)) {
            writeStream1.write(line + '\n');
        } else if (line.includes(mass2)) {
            writeStream2.write(line + '\n');
        }
    }
);

getLine.on('close', () => {
    console.log('Выполнение программы завершено!');
});