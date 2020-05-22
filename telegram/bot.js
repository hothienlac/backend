const axios = require('axios');


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

TOKEN = process.env.TELEGRAM_TOKEN

const userClient = require('./user.client');


class Bot {
	
	constructor() {
		this.axios = axios.create({
			baseURL: `https://api.telegram.org/bot${TOKEN}`,
		});
		
	}

	addServer(server) {
		this.server = server;
	}

	async receiveMessage(sender, content) {
		if (content === 'id') {
			this.sendMessage(sender, {text: sender});
			return;
		}
		// this.server.receive(sender, content);
		let role = '';
		try {
			role = (await userClient.getRoleByTelegram(sender)).role;
		} catch(e) {
			// console.log(e);
		}
		let result;
		if (role === 'PARENT') {
			result = await require('./reply-markup-builder/p')('0');
		} else if (role === 'STUDENT') {
			result = await require('./reply-markup-builder/s')('0');
		} else {
			result = {
				text: 'The chat bot is only used for TTS students and TTS parents. If you are, but you see this message, please contact us via admin@dorm.ngothithanhtruc.com to register. If you are in administrators team, please use website version.',
				reply_markup: {
					inline_keyboard: [
						[{
							text: 'Website Version (For administrators only)',
							url: 'https://dorm.ngothithanhtruc.com/',
						}],
						[{
							text: 'Visit Tan Tao University',
							url: 'http://ttu.edu.vn/',
						}],
						[{
							text: 'Contact Us with Facebook',
							url: 'https://www.facebook.com/tantaouniversity',
						}]
					]
				},
			}
		}
		this.sendMessage(sender, result)
	}

	async updateMessage(callback_query) {
		const data = callback_query.data.split(',');
		const message_id = callback_query.message.message_id;
		const chat_id = callback_query.message.chat.id;
		// const result = xx[data[0]]([1]);

		const template = require('./reply-markup-builder');

		const result = await template[data[0]](data[1]);

		this.editMessageText({chat_id, message_id, ...result, parse_mode: 'HTML'});
	}

	editMessageText(data) {
		this.axios.post('/editMessageText', data)
		.then((res) => {})
		.catch((err) => {console.log(err.response.data)});
	}

	async sendMessage(receiver, content) {

		const parse_mode = 'HTML';

		this.axios.post('/sendMessage', {
			chat_id: receiver,
			parse_mode,
			...content
		})
		.catch((err) => {console.log(err.response.data)});
	}
}

module.exports = Bot;