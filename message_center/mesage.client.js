const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");


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
   
// const MESSAGE_SERVER = process.env.MESSAGE_SERVER + ':' + process.env.MESSAGE_PORT;
const MESSAGE_SERVER = 'localhost:50005';



class message {

    constructor() {
        this.messageService = new proto.message.MessageService(
            MESSAGE_SERVER,
            grpc.credentials.createInsecure()
        );
        const listener = this.messageService.ReceiveMessage({});
        listener.on("data", message.handleMessage.bind(this));
    }

    static handleMessage(data) {
        const sender = data['sender'];
        const content = data['content'];
        console.log('From: ', sender);
        console.log('Content:', content);
        this.sendMessage(sender, 'You have send: ' + content);
    }

    sendMessage(receiver, content) {
        this.messageService.SendMessage({receiver, content}, ()=>{});
    }
    
}

module.exports = message;