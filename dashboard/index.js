const express = require('express');
const bodyParser = require('body-parser');
cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./models");
const Role = db.role;
db.sequelize.sync().then(() => {
    initial();
});

function initial() {
    Role.create({
        id: 2,
        name: "MODERATOR"
    }).catch((e) => {});

    Role.create({
        id: 1,
        name: "ADMIN"
    }).catch((e) => {});
}

app.get('/', function(req, res) {
    res.json({ message: 'Express is up!' });
});


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);



app.listen(process.env.SERVER_PORT, function(){
    console.log('Express is running on port 3000');
});
