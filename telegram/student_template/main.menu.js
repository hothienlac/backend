const reply_markup = {
    inline_keyboard: [
        [{
            text: 'Children Activities',
            callback_data: 'activities',
        }],
        [{
            text: 'Requests',
            callback_data: 'requests',
        }],
        [{
            text: 'Setting',
            callback_data: 'setting',
        }]
    ]
}

const text = '=== MAIN MENU ===';

module.exports = () => {reply_markup, text};