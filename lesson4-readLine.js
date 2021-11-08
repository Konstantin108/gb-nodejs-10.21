const fs = require('fs');
const path = require('path');
const readLine = require('readline');

const rl = readLine.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

const question = async (question) =>
    new Promise(resolve => rl.question(question, resolve));

(async () => {
    const filePath = await question('please enter the path to the file: ');
    const fullPath = path.resolve(__dirname, filePath);
    const encoding = await question('please enter the encoding: ');

    // fs.readFile(filePath, encoding, (err, data) => {        //<-- асинхронный вид
    //     if (err) console.log(err);
    //     else console.log(data);
    // });
    // rl.close();

    const data = fs.readFileSync(fullPath, encoding);        //<-- синхронный вид
    console.log(data);
    rl.close();
})()

// rl.question('please enter the path to the file: ', (filePath) => {
//     console.log('path:', filePath);
//     rl.close();
// });

// rl.question('please enter the encoding: ', (encoding) => {
//     console.log('encoding:', encoding);
//     rl.close();
// });