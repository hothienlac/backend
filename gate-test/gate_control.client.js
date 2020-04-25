require('dotenv').config();
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");


//Load the protobuf
const proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("proto/gate_control.proto", {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })
);
   
const MESSAGE_SERVER = process.env.GATE_CONTROL_SERVER + ':' + process.env.GATE_CONTROL_PORT;

class GateControl {

    constructor() {
        this.gateControlService = new proto.gate_control.GateService(
            MESSAGE_SERVER,
            grpc.credentials.createInsecure()
        );
    }

    async Go(userId, goOut, callback) {
        this.gateControlService.Go(
            {userId, goOut},
            callback
        );
    }
    
}

module.exports = GateControl;