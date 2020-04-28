require('dotenv').config();

const port = process.env.WEBHOOK_PORT;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


class Webhook {

    constructor(bot) {
        this.bot = bot;
    }

    listen() {
        const app = express();
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        
        
        app.get('/hello', (req, res) => {
            res.send('Hello');
        })
        
        // We are receiving updates at the route below!
        app.post(`/`, (req, res) => {
            if (req.body.message) {
                this.bot.receiveMessage(req.body.message.from.id, req.body.message.text);
            }
            if (req.body.callback_query) {
                this.bot.updateMessage(req.body.callback_query);
            }
            res.sendStatus(200);
        });
        
        // Start Express Server
        app.listen(port, () => {
            console.log(`Telegram webhook server is listening on ${port}`);
        });
    }
}

module.exports = Webhook;