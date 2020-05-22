const reply_markup = {
    inline_keyboard: [
        [{
            text: 'My Activities',
            callback_data: 'sa,0',
        }],
        [{
            text: 'Requests',
            callback_data: 'sr,0',
        }],
        [{
            text: 'Setting',
            callback_data: 'ss,0',
        }]
    ]
}

const text = `
<b>Main Menu</b>

Choose the menu below to interact with the bot. The bot is not implemented with natural language processing <i>(NLP)</i>, so please use <i>button</i> only, instead of sending text.
`

module.exports = async () => {
    return {text, reply_markup}
}