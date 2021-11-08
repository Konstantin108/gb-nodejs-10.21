#!/home/user1/.nvm/versions/node/v16.13.0/bin/node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const executionDir = process.cwd();
const isFile = (fileName) => fs.lstatSync(fileName).isFile();
const list = fs.readdirSync('./').filter(isFile)

inquirer.prompt([
    {
        name: 'fileName',
        type: 'list',
        message: 'choose a file to read',
        choices: list
    }
]).then(({fileName}) => {
    const fullPath = path.resolve(executionDir, fileName);

    fs.readFile(fullPath, 'utf-8', (err, data) => {
        if (err) console.log(err);
        else console.log(data);
    });
});