const colors = require('colors');
const green = colors.green;
const yellow = colors.yellow;
const red = colors.red;


const [firstNum, lastNum] = process.argv.slice(2);

function inputData(firstNum, lastNum) {
    let arr = [];
    if (!isNaN(firstNum) && !isNaN(lastNum)) {
        console.log('будут выведены все простые числа в диапазоне от', green(firstNum), 'до', green(lastNum));
        nextPrime:
            for (let i = firstNum; i <= lastNum; i++) {
                for (let j = 2; j < i; j++) {
                    if (i % j === 0) continue nextPrime;
                }
                if (i > 1) {
                    arr.push(i);
                }
            }
    } else {
        console.log(red('переданный аргумент не является числом'));
    }
    return arr;
}

let data = inputData(firstNum, lastNum);

function search(data) {
    if (data.length) {
        for (let i = 1; i < data.length; i++) {
            if (i % 2 === 0 && i % 3 != 0) {
                console.log(yellow(data[i]));
            }
            if (i % 3 === 0) {
                console.log(red(data[i]));
            } else if (i % 3 != 0 && i % 2 != 0) {
                console.log(green(data[i]));
            }
        }
    } else {
        console.log(red('в заданном диапазоне простые числа отсутствуют'));
    }
}

search(data);


