require('dotenv').config();


const Bot = require('./bot');
const bot = new Bot(process.env.TELEGRAM_TOKEN);

const Server = new require('./message.server');
const server = new Server();

server.addBot(bot);
bot.addServer(server);

server.listen();
