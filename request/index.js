require('dotenv').config();

const models = require('./models')

models.sequelize.sync().then(() => {
    console.log('Datebase connected!')
}).catch((err) => {
    console.log(err, "Something Wrong!")
})