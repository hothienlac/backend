const { promisify } = require('util');
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

function promisifyAll(client) {
    const to = {};
    for (var k in client) {
        if (typeof client[k] != 'function') continue;
        to[k] = promisify(client[k].bind(client));
    }
    return to;
}

//Load the protobuf
const proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("proto/user.proto", {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })
);
   
// const USER_SERVER = process.env.USER_SERVER + ':' + process.env.USER_PORT;
const USER_SERVER = 'localhost:50003';

class User {

    constructor() {
        const client = new proto.user.UserService(
            USER_SERVER,
            grpc.credentials.createInsecure()
        );
        this.userService = promisifyAll(client);
    }

    getRoleByTelegram(telegram) {
        return this.userService.GetRoleByTelegram({telegram});
    }

    getChildren(telegram) {
        return this.userService.GetChildrenByTelegram({telegram});
    }
}

const user = new User();

module.exports = user;