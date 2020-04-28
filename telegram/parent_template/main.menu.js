const mainMenu = {
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

module.exports = mainMenu;