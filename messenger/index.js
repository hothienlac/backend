const
    express = require('express'),
    bodyParser = require('body-parser'),
    Bot = require('./bot'),
    app = express().use(bodyParser.json());





const path = require('path');
const MessengerServer = require('./messenger.server');

const PORT = 50005;
const PROTO_PATH = path.join(__dirname, '/proto/messenger.proto');

const server = new MessengerServer(PROTO_PATH, PORT);

server.listen();



const bot = new Bot(server);


// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {
 
    let body = req.body;
  
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
  
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {
    
            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            
            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            
            // Get the timestamp
            let timestamp = webhook_event.timestamp;


            
            // Handler
            
            if (webhook_event.message) {
                bot.handleMessage(sender_psid, webhook_event.message);        
            }

            if (webhook_event.postback) {
                bot.handlePostback(sender_psid, webhook_event.postback);
            }
            
        });
    
        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
  
});


// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "123"
      
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
    
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);      
        }
    }
});

app.get('/hello',(req, res) => {
    server.receive('work', 'ok')
    res.status(200).send('hello')
})


unix_socket = '/var/www/html/messenger.dorm.ngothithanhtruc.com/run/messenger.sock'

app.listen(3000, () => console.log('webhook is listening'));



