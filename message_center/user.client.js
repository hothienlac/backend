const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");


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
   
const USER_SERVER = process.env.USER_SERVER + ':' + process.env.USER_PORT;
// const USER_SERVER = 'localhost:50003';

class User {

    constructor() {
        this.userService = new proto.user.UserService(
            USER_SERVER,
            grpc.credentials.createInsecure()
        );
    }

    getRoleByTelegram(telegram, callback) {
        this.userService.GetRoleByTelegram({telegram}, callback);
    }
}

const user = new User();

module.exports = user;