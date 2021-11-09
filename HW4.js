#!/home/user1/.nvm/versions/node/v16.13.0/bin/node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const colors = require('colors');
const green = colors.green;
const yellow = colors.yellow;
const red = colors.red;
const [key] = process.argv.slice(2);

const list = fs.readdirSync('./');

function reader(list) {
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list',
            message: 'choose a file to read',
            choices: list
        }
    ]).then(({fileName}) => {
        const executionDir = process.cwd();
        const fullPath = path.resolve(executionDir, fileName);
        if (fs.lstatSync(fullPath).isFile()) {
            return fs.readFile(fullPath, 'utf-8', (err, data) => {
                if (err) console.log(err);
                else console.log(data);
                if (data.match(key)) console.log(`Ключ ${green(key)} в файле ${yellow(fileName)} найден`);
                else console.log(`Ключ ${green(key)} в файле ${yellow(fileName)} ${red('отсутствует')}`);
            });
        } else if (!fs.lstatSync(fullPath).isFile()) {
            return reader(fs.readdirSync(fullPath));
        }
    });
}

reader(list);