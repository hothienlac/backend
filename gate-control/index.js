const path = require('path');
const GateServer = require('./gate.server');

const PORT = 50007;
const PROTO_PATH = path.join(__dirname, '/proto/gate_control.proto');

const server = new GateServer(PROTO_PATH, PORT);


server.listen();