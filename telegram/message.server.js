const path = require('path');
const grpc = require('grpc');
const protoLoader = require("@grpc/proto-loader");

const PORT = process.env.SERVER_PORT;
const PROTO_PATH = path.join(__dirname, '/proto/message.proto');


// ---------- LOGGIN FEATURES ----------
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/server.log', {flags : 'a'});
var log_stdout = process.stdout;

console.log = function(d) { //
	log_file.write(util.format(d) + '\n');
	log_stdout.write(util.format(d) + '\n');
};
// ---------- LOGGIN FEATURES END ----------

class MessageServer {

    addBot(bot) {
        this.bot = bot;
    }

    constructor() {
        this.port = PORT;

        this.messengerService = grpc.loadPackageDefinition(
            protoLoader.loadSync(PROTO_PATH, {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            })
        );
        this.server = new grpc.Server();
        this.server.addService(
            this.messengerService.message.MessageService.service,
            {
                SendMessage: MessageServer.sendMessage.bind(this),
                ReceiveMessage: MessageServer.receiveMessage.bind(this),
            }
        )
    }

    static sendMessage(call, callback) {
        const receiver = call.request.receiver;
        const content = call.request.content;
        const type = call.request.type;
        try {
            this.bot.sendMessage(receiver, content, type)
            callback(null, null)
        } catch (err) {
            console.warn(err);
            callback(err);
        }
    }    

    static receiveMessage(call, callback) {
        this.listener = call;
    }

    receive(sender, content) {
        try {
            this.listener.write({
                sender: sender,
                content: content,
            });
        } catch(err) {
            console.log(err);
        }
    }

    listen () {
        this.server.bind(`0.0.0.0:${this.port}`, grpc.ServerCredentials.createInsecure());
        console.log(`Messenger grpc server listening on ${this.port}`);
        this.server.start();
    }

}

module.exports = MessageServer