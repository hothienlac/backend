const request = {
    inline_keyboard: [
        [{
            text: 'Request 1',
            callback_data: 'request1',
        }],
        [{
            text: 'Request 2',
            callback_data: 'requests2',
        }],
        [{
            text: 'Main Menu',
            callback_data: 'mainMenu',
        }]
    ]
}

module.exports = request;