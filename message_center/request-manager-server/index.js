const path = require('path');
const grpc = require('grpc');
const protoLoader = require("@grpc/proto-loader");

const PORT = process.env.SERVER_PORT;
const PROTO_PATH = path.join(__dirname, '../proto/request-manager.proto');



class MessageCenterServer {

    constructor(models, notification) {
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

        const CreateRequest = require('./CreateRequest')(models, notification);
        // const GetAllActiveRequest = require('./GetAllActiveRequest')(models, notification);
        // const GetActiveRequestByStudent = require('./GetActiveRequestByStudent')(models, notification);
        // const GetRequestHistory = require('./GetRequestHistory')(models, notification);

        this.server = new grpc.Server();
        this.server.addService(
            this.messageCenterService.request_manager.RequestManagerService.service,
            {
                CreateRequest
                // GetAllActiveRequest,
                // GetActiveRequestByStudent,
                // GetRequestHistory,
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