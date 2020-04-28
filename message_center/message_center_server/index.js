const path = require('path');
const grpc = require('grpc');
const protoLoader = require("@grpc/proto-loader");

const PORT = process.env.SERVER_PORT;
const PROTO_PATH = path.join(__dirname, '/proto/message_center.proto');



class MessageCenterServer {

    constructor(services) {
        this.port = PORT;

        this.messageCenterService = grpc.loadPackageDefinition(
            protoLoader.loadSync(PROTO_PATH, {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            })
        );

        const GetAllActiveRequest = require('./GetAllActiveRequest')(services);
        const GetActiveRequestByStudent = require('./GetActiveRequestByStudent')(services);
        const GetRequestHistory = require('./GetRequestHistory')(services);

        this.server = new grpc.Server();
        this.server.addService(
            this.messageCenterService.message_center.MessageCenterService.service,
            {
                GetAllActiveRequest,
                GetActiveRequestByStudent,
                GetRequestHistory,
            },
        )
    }

    listen () {
        this.server.bind(`localhost:${this.port}`, grpc.ServerCredentials.createInsecure());
        console.log(`Message Center grpc server listening on ${this.port}`);
        this.server.start();
    }

}

module.exports = MessageCenterServer