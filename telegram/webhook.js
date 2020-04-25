require('dotenv').config();

const TOKEN = process.env.TELEGRAM_TOKEN;
const url = process.env.WEBHOOK_URL;
const port = process.env.WEBHOOK_PORT;

const express = require('express');
const axios = require("axios");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/hello', (req, res) => {
    res.send('Hello');
})

// We are receiving updates at the route below!
app.post(`/`, (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});
