const reply_markup = {
    inline_keyboard: [
        [{
            text: 'Children Activities',
            callback_data: 'pa,0',
        }],
        [{
            text: 'Requests',
            callback_data: 'pr,0',
        }],
        [{
            text: 'Setting',
            callback_data: 'ps,0',
        }]
    ]
}


const text = `
<b>Main Menu</b>

Choose the menu below to interact with the bot. The bot is not implemented with natural language processing <i><b>NLP</b></i>, so please use <i><b>button</b></i> only, instead of sending text.
`

module.exports = async () => {
    return {text, reply_markup}
}