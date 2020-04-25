const path = require('path');
const grpc = require('grpc');
const protoLoader = require("@grpc/proto-loader");
const pino = require('pino');

function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
    if (!err) {
        console.log('message sent!')
    } else {
        console.error("Unable to send message:" + err);
    }
    }); 
}

function send(text) {
    let request_body = {
        "recipient": {
            "id": '3469845626365526'
        },
        "message": { "text": text }
    }
    callSendAPI('3469845626365526', { "text": text });
}

const logger = pino({
  name: 'paymentservice-server',
  messageKey: 'message',
  changeLevelName: 'severity',
  useLevelLabels: true
});

const bot = require('./bot')

class MessengerServer {

    addBot(bot) {
        this.bot = bot;
    }

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
                SendMessage: MessengerServer.sendMessage.bind(this),
                ReceiveMessage: MessengerServer.receiveMessage.bind(this),
            }
        )
    }

    static sendMessage(call, callback) {
        const receiver = call.request.receiver;
        const content = call.request.content;
        try {
            this.bot.send(receiver,content)
            callback(null, null)
        } catch (err) {
            console.warn(err);
            callback(err);
        }
    }

    

    static receiveMessage(call, callback) {
        call.write({
            sender: 'sender',
            content: 'content',
        })
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