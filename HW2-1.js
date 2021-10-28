console.log('Record 1');      // будет выведен 1ым - макротаск

setTimeout(() => {
    console.log('Record 2');      // будет выведен 4ым - сеттаймауты идут за промисами
    Promise.resolve().then(() => {
        setTimeout(() => {
            console.log('Record 3');      // будет выведен 5ым - находится внутри другого таска, поэтому выполняется
            Promise.resolve().then(() => {                                     // после своего "макротаска"
                console.log('Record 4');      // будет выведен 6ым - то же, что и с 5ым пунктом
            });
        });
    });
});

console.log('Record 5');      // будет выведен 2ым - макротаск

Promise.resolve().then(() =>
    Promise.resolve().then(() => console.log('Record 6'))      // будет выведен 3им - промисы идут во вторую очередь
);