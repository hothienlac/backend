const reply_markup = {
    inline_keyboard: [
        [{
            text: '<< Main menu',
            callback_data: 's,0',
        }],
    ]
}

const text = `
<b>My Activities</b>

Sorry, this feature is not available now!!
`

module.exports = async () => {
    return {text, reply_markup}
}