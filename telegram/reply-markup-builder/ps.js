const reply_markup = {
    inline_keyboard: [
        [{
            text: '<< Main menu',
            callback_data: 'p,0',
        }],
    ]
}

const text = `
<b>Setting</b>

Sorry, this feature is not available now!!
`

module.exports = async () => {
    return {text, reply_markup}
}