const axios = require('axios');

const parent_template = require('./parent_template');
const student_template = require('./student_template');

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


class Bot {
	
	constructor() {
		this.axios = axios.create({
			baseURL: `https://api.telegram.org/bot${TOKEN}`,
		});
		
	}

	addServer(server) {
		this.server = server;
	}

	receiveMessage(sender, content) {
		this.server.receive(sender, content)
	}

	updateMessage(callback_query) {
		console.log(callback_query);
		const data = callback_query.data;
		const message_id = callback_query.message.message_id;
		const chat_id = callback_query.message.chat.id;
		const result = parent_template[data]();
		const text = result.text;
		const reply_markup = result.reply_markup;

		this.editMessageText({chat_id, message_id, text, reply_markup});
	}

	editMessageText(data) {
		this.axios.post('/editMessageText', data)
		.then((res) => {console.log(res.data)})
		.catch((err) => {console.log(err.response.data)});
	}

	sendMessage(receiver, content, type) {
		console.log({receiver, content, type});
		if (type === 'STUDENT') {
			this.sendStudent(receiver, content);
			return;
		}
		if (type === 'PARENT') {
			this.sendParent(receiver, content);
			return;
		}
		this.sendOther(receiver, content);
	}

	sendParent(receiver, content) {
		console.log('PARENT');
		this.axios.post('/sendMessage', {
			chat_id: receiver,
			text: content,
			reply_markup: parent_template.mainMenu
		})
		.then((res) => {console.log(res.data)})
		.catch((err) => {console.log(err.response.data)});
	}

	sendStudent(receiver, content) {
		console.log('STUDENT');
		this.axios.post('/sendMessage', {
			chat_id: receiver,
			text: content,
			reply_markup: student_template.mainMenu
		})
		.then((res) => {console.log(res.data)})
		.catch((err) => {console.log(err.response.data)});
	}

	sendOther(receiver, content) {
		console.log('OTHER');
		this.axios.post('/sendMessage', {
			chat_id: receiver,
			text: content,
			reply_markup: {
				inline_keyboard: [
					[{
						text: 'Visit Tan Tao University',
						url: 'http://ttu.edu.vn/',
					}],
					[{
						text: 'Contact Us with Facebook',
						url: 'https://www.facebook.com/tantaouniversity',
					}]
				]
			}
		})
		.then((res) => {console.log(res.data)})
		.catch((err) => {console.log(err.response.data)});
	}
}

module.exports = Bot;