require('moment-precise-range-plugin');
const moment = require('moment');
const EventEmitter = require('events');
const emitter = new EventEmitter;

const data = process.argv.slice(2);
const dateFormat = "YYYY-MM-DD HH:mm:ss";

function getData(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        const split = data[i].split('-');
        data[i] = `${split[4]}-${split[3]}-${split[2]} ${split[0]}:${split[1]}:00`;
        moment(data[i], dateFormat);
        arr.push(data[i]);
    }
    return arr;
}

let date = getData(data);

function run(data) {
    let interval = 1000;
    for (let i = 0; i < data.length; i++) {
        setInterval(function () {
            let nowDate = moment(new Date(), dateFormat);
            moment.preciseDiff(nowDate, data[i]).length ?
                console.log(`Работает таймер №${Number([i]) + 1}. До конца отсчёта осталось: ${moment.preciseDiff(nowDate, data[i])}`) :
                console.log(`Таймер №${Number([i]) + 1} закончил свою работу`);
        }, interval);
    }
}

run(date);

function clear() {
    let interval = 1000;
    setInterval(function () {
        console.clear();
    }, interval);
}

setTimeout(clear, 900);

class Handlers {
    static calculate() {
        emitter.emit('calculate', run(myDate));
    }

    static clear() {
        emitter.emit('clear', clear());
    }
}

emitter.on('calculate', Handlers.calculate);
emitter.on('clear', Handlers.clear);

