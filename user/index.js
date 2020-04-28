const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const path = require('path');

require('dotenv').config();


const models = require('./models');

models.sequelize.sync().then(() => {
    console.log('Datebase connected!')
}).catch((err) => {
    console.log(err, "Something Wrong!")
})






const UserServer = require('./server');

const services = require('./services')(models);

const server = new UserServer(services);

server.listen();



