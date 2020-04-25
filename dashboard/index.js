const express = require('express');
const bodyParser = require('body-parser');
cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(req, res) {
    res.json({ message: 'Express is up!' });
});


app.use(require('./routes'));


app.listen(process.env.SERVER_PORT, function(){
    console.log('Express is running on port 3000');
});
