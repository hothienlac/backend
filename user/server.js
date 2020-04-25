const path = require('path');
const grpc = require('grpc');
const protoLoader = require("@grpc/proto-loader");

class UserServer {

    constructor(protoRoot, port, services) {
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
            this.messengerService.user.UserService.service,
            services,
        )
    }

    listen () {
        this.server.bind(`localhost:${this.port}`, grpc.ServerCredentials.createInsecure());
        console.log(`Messenger grpc server listening on ${this.port}`);
        this.server.start();
    }

}

module.exports = UserServer