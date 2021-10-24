const colors = require('colors');
const [front, to] = process.argv.slice(2);
console.log(colors.green('hello from'), colors.yellow(front), colors.red(to));

