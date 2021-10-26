const EventEmitter = require('events');     //<-- подключаем класс емиттер
const emitter = new EventEmitter;     //<-- создаем экземпляр класса

const RequestTypes = [
    {
        type: 'send',
        payLoad: 'to send a document'
    },
    {
        type: 'receive',
        payLoad: 'to receive a document'
    },
    {
        type: 'sign',
        payLoad: 'to sign a document'
    }
];

class Customer {
    constructor({type, payLoad}) {
        this.type = type;
        this.payLoad = payLoad;
    }
}

const generateIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateNewCustomer = () => {
    const randomTypeIndex = generateIntInRange(0, RequestTypes.length - 1);
    const randomCustomerType = RequestTypes[randomTypeIndex];

    return new Customer(randomCustomerType);
}

console.log(generateNewCustomer());

const run = async () => {
    const {type, payLoad} = generateNewCustomer();
    const delay = generateIntInRange(1000, 5000);

    emitter.emit(type, payLoad);
    await new Promise(resolve => setTimeout(resolve, delay));
    await run();
}

// emitter.on('send', console.log);
// emitter.emit('send', 'message');

class Handlers {     //<-- хэндлеры ловят новое событие(появление нового кастомера)
    static send(payload) {
        console.log('Send request:', payload);
    }

    static receive(payload) {
        console.log('Receive request:', payload);
    }

    static sign(payload) {
        emitter.emit('error', 'Broken pen');
        // console.log('Sign request:', payload);
    }
}

emitter.on('send', Handlers.send);     //<-- подписываемся
emitter.on('receive', Handlers.receive);
emitter.on('sign', Handlers.sign);
emitter.on('error', console.log);

run();     //<-- запускаем функцию

//console.clear();     <-- команда для очистки консоли