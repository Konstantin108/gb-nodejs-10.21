const fs = require('fs');
const yargs = require('yargs');

const options = yargs
    .usage('Usage: p <path to the file>')
    .option('p', {
        alias: 'path',
        describe: 'Path to the file',
        type: 'string',
        demandOption: true
    }).argv;

fs.readFile(options.p, 'utf-8', (err, data) => {
    if (err) console.log(err);
    else console.log(data);
});