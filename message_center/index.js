require('dotenv').config();


const models = require('./models')

models.sequelize.sync().then(() => {
    console.log('Datebase connected!')
}).catch((err) => {
    console.log(err, "Something Wrong!")
})

const db_services = require('./db-services')(models);

const MessageCenterServer = require('./message_center_server');
const server = new MessageCenterServer(db_services);
server.listen();



const Message = require('./mesage.client');
const message = new Message();


const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
});

const receiver = '1161835302';

rl.on("line", (text) => {
    message.send.call(message, receiver, text, '');
});