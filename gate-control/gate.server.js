const path = require('path');
const grpc = require('grpc');
const protoLoader = require("@grpc/proto-loader");
const mysql = require('mysql');

const GoIn = require('./go-in');
const GoOut = require('./go-out');

class GateServer {

    addBot(bot) {
        this.bot = bot;
    }

    constructor(protoRoot, port) {
        this.port = port;

        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'dorm_database'
        });

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
            this.messengerService.gate_control.GateService.service,
            {
                Go: GateServer.go.bind(this),
            }
        )
    }

    static go(call, callback) {
        const userId = call.request.userId;
        const goOut = call.request.goOut;
        const label = call.request.label;
        const current_time = new Date(Date.now());

        try {
            const accepted = goOut ? GoOut(this.connection, callback, label, current_time) : GoIn(userId);
            // const message = 'abc';
            // const result = {accepted, message};
            // console.log(result);
            // callback(null, result)
        } catch (err) {
            console.warn(err);
            callback(err);
        }
    }

    listen () {
        this.server.bind(`0.0.0.0:${this.port}`, grpc.ServerCredentials.createInsecure());
        console.log(`Messenger grpc server listening on ${this.port}`);
        this.server.start();
    }

}

module.exports = GateServer