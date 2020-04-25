const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");


//Load the protobuf
const proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("proto/user.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    })
);

const REMOTE_SERVER = process.env.USER_CLIENT_SERVER + ':' + process.env.USER_CLIENT_PORT;


//Create gRPC client
const client = new proto.user.UserService(
    REMOTE_SERVER,
    grpc.credentials.createInsecure()
);

module.exports = client