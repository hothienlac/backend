require('dotenv').config();


const Bot = require('./bot');
const bot = new Bot();

const Server = require('./message.server');
const server = new Server();

const Webhook = require('./webhook');
const webhook = new Webhook(bot);

server.addBot(bot);
bot.addServer(server);

server.listen();
webhook.listen();
