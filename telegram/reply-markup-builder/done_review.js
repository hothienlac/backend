module.exports = async (previous) => {

    const result = previous.split('+')

    console.log(`${result[0]} ${result[1]} successfully`);
    const reply_markup = {
        inline_keyboard: [
            [
                {
                    text: '<< MAIN MENU',
                    callback_data: `p,0`,
                },
            ],
        ]
    }

    const text = `${result[0]} ${result[1]} successfully`;
    
    return({reply_markup, text});
}