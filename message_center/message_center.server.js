const path = require('path');
const grpc = require('grpc');
const protoLoader = require("@grpc/proto-loader");

const PORT = process.env.SERVER_PORT;
const PROTO_PATH = path.join(__dirname, '/proto/messenger.proto');


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

class MessageCenterServer {

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
}

module.exports = MessageCenterServer