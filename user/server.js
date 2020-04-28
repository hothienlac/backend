const path = require('path');
const grpc = require('grpc');
const protoLoader = require("@grpc/proto-loader");

const PORT = process.env.PORT;
const PROTO_PATH = path.join(__dirname, '/proto/user.proto');

class UserServer {

    constructor(services) {
        this.port = PORT;

        this.userService = grpc.loadPackageDefinition(
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
            this.userService.user.UserService.service,
            services,
        )
    }

    listen () {
        this.server.bind(`localhost:${this.port}`, grpc.ServerCredentials.createInsecure());
        console.log(`User grpc server listening on ${this.port}`);
        this.server.start();
    }

}

module.exports = UserServer