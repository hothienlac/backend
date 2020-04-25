const path = require('path');
const grpc = require('grpc');
const protoLoader = require("@grpc/proto-loader");
const pino = require('pino');

const logger = pino({
  name: 'paymentservice-server',
  messageKey: 'message',
  changeLevelName: 'severity',
  useLevelLabels: true
});

const bot = require('./bot')

class MessengerServer {

    constructor(protoRoot, port) {
        this.port = port;

        this.messengerService = grpc.loadPackageDefinition(
            protoLoader.loadSync(protoRoot, {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            })
        );
        this.server = new grpc.Server();
        this.server.addService(
            this.messengerService.mesenger.MessengerService.service,
            {
                SendMessage: this.sendMessage,
                ReceiveMessage: MessengerServer.receiveMessage.bind(this),
            }
        )
    }

    sendMessage(call, callback) {
        const receiver = call.request.receiver;
        const content = call.request.content;
        try {
            bot.callSendAPI(receiver, content)
            callback(null, null)
        } catch (err) {
            console.warn(err);
            callback(err);
        }
    }

    static receiveMessage(call, callback) {
        console.log('async')
        console.log(call)
        // while (true) {
        //     call.write({
        //         sender: 'a',
        //         content: 'x',
        //     })
        //     await new Promise(resolve => setTimeout(resolve, 1000));
        // }
        this.listener = call;
    }

    receive(sender, content) {
        console.log(this.listener);
        this.listener.write({
            sender: sender,
            content: content,
        });
        console.log('abc');
    }

    listen () {
        this.server.bind(`0.0.0.0:${this.port}`, grpc.ServerCredentials.createInsecure());
        logger.info(`Messenger grpc server listening on ${this.port}`);
        this.server.start();
    }

}

module.exports = MessengerServer