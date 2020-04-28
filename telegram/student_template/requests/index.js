const reply_markup = {
    inline_keyboard: [
        [{
            text: 'New Request',
            callback_data: 'request.new',
        }],
        [{
            text: 'Cancel Pending Request',
            callback_data: 'request.cancel',
        }],
        [{
            text: '<< Main Menu',
            callback_data: 'mainMenu',
        }]
    ]
}

const text = '=== REQUESTS ===';

module.exports = () => {reply_markup, text};