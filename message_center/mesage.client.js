const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const user = require('./user.client');

//Load the protobuf
const proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("proto/message.proto", {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })
);
   
const MESSAGE_SERVER = process.env.MESSAGE_SERVER + ':' + process.env.MESSAGE_PORT;
// const MESSAGE_SERVER = 'localhost:50005';



class Message {

    constructor() {
        Message.connectServer.call(this);
    }

    static connectServer() {
        this.messageService = new proto.message.MessageService(
            MESSAGE_SERVER,
            grpc.credentials.createInsecure()
        );
        const listener = this.messageService.ReceiveMessage({});
        console.log('Connected to server successfully!!');
        listener.on("data", Message.handleMessage.bind(this));
        listener.on("error", (err) => {
            console.log('Opp.. Connection is down!!! Trying to reconnect to server in 5 seccond.');
            setTimeout(Message.connectServer.bind(this), 5000);
        });
    }

    static handleMessage(data) {
        if (data.sender === '') {
            console.log(data.content);
            return;
        }
        const sender = data['sender'];
        const content = data['content'];

        console.log('From: ', sender);
        console.log('Content:', content);

        user.getRoleByTelegram(sender, (err, data) => {
            let userType;
            if (err) {
                userType = 'OTHER';
            } else {
                userType = data.role;
            }
            console.log(userType);
            Message.sendMessage.call(this, sender, content, userType);
        });
    }

    static sendMessage(receiver, content, type) {
        this.messageService.SendMessage({receiver, content, type}, ()=>{});
    }

    send(receiver, content, type) {
        Message.sendMessage.call(this, receiver, content, type);
    }
    
}

module.exports = Message;