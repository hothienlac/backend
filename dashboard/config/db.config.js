const path = require('path');

module.exports = {
    username: 'root',
    password: 'TrucNgodethuong123!',
    storage: './database/database.sqlite',
    host: 'localhost',
    dialect: 'sqlite',
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};