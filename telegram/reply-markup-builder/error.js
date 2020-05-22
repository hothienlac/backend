module.exports = async (error) => {
    return {
        text: `Opp!!! Something went wrong!!!\n\n${error}`,
        reply_markup: {
            inline_keyboard: [
                [{
                    text: '<< Main menu',
                    callback_data: 's,0',
                }]
            ]
        }
    }
}