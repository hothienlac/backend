const TelegramBot = require('node-telegram-bot-api');

// ---------- LOGGIN FEATURES ----------
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/bot.log', {flags : 'a'});
var log_stdout = process.stdout;

console.log = function(d) { //
	log_file.write(util.format(d) + '\n');
	log_stdout.write(util.format(d) + '\n');
};
// ---------- LOGGIN FEATURES END ----------

console.log("[DEBUG] Bot is starting...");


function log(msg) {
	let date = new Date(msg.date * 1000);
	let timestamp = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + "@" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	 
	
	let msgFromInfo = "";
	console.log(msg)
	if(msg.chat.type == "private"){
		msgFromInfo = msg.from.first_name + "(" + msg.from.id + ")";
	}else if(msg.chat.type == "group"){
		msgFromInfo = msg.from.first_name + "(" + msg.from.id + "/" + msg.chat.title + ")";
	}
	
	console.log("[INFO](" + timestamp + ") Msg from " + msgFromInfo + ": " + msg.text);
}


class Bot {
	
	constructor(token) {
		this.bot = new TelegramBot(token, {polling: true});
		this.bot.on('message', (msg) => {
			log(msg);
			const handler = Bot.handleMessage.bind(this);
			handler(msg.chat.id, msg.text)
		})
	}

	addServer(server) {
		this.server = server;
	}

	static handleMessage(sender, content) {
		this.sendMessage(sender, 'You have sent: ' + content)
		this.server.receive(sender, content);
	}

	sendMessage(receiver,content){
		this.bot.sendMessage('1161835302', content)
	}

}

module.exports = Bot;