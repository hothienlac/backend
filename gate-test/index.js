require('dotenv').config();


const GateControlClient = require('./gate_control.client');
const gateControlClient = new GateControlClient();


const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('Mock service started!');

function proocess(err, result) {
    console.log(result)
}

rl.on("line", (text) => {
    text = text.split(" ",2);
    const userId = text[0];
    const goOut = text[1] == 'true';

    gateControlClient.Go(userId, goOut, proocess);
});