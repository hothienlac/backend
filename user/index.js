const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const path = require('path');

require('dotenv').config();


const models = require('./models')

models.sequelize.sync().then(() => {
    console.log('Datebase connected!')
}).catch((err) => {
    console.log(err, "Something Wrong!")
})






const UserServer = require('./server')

const PORT = process.env.PORT;
const PROTO_PATH = path.join(__dirname, '/proto/user.proto');

const services = require('./services')(models)

const server = new UserServer(PROTO_PATH, PORT, services);

server.listen();



