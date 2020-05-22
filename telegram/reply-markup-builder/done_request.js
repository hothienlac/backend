module.exports = async (previous) => {
    console.log('REGISTER NEW REQUEST, ' + previous);
    const reply_markup = {
        inline_keyboard: [
            [
                {
                    text: '<< REQUEST MENU',
                    callback_data: `sr,0`,
                },
            ],
        ]
    }

    const text = 'Your request is submited successfully!'
    
    return({reply_markup, text});
}