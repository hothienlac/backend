module.exports = async (previous) => {
    console.log('ABORT PENDING REQUEST, ' + previous);
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

    const text = 'Your request is aborted successfully!'
    
    return({reply_markup, text});
}