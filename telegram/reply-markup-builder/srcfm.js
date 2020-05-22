


const requestManagerClient = require('../request-manager.client');
const userClient = require('../user.client');

module.exports = async (previous) => {

    let inline_keyboard = [];

    for (i = 0; i < 4; i++) {
        let x = [];
        for (j = 0; j < 3; j++) {
            const m = i*15 + j*5;
            x.push({
                text: `${m}`,
                callback_data: `srcth,${previous}+${m}`,
            })
        };
        inline_keyboard.push(x);
    }

    inline_keyboard.push([
        {
            text: '<< Cancel',
            callback_data: 'sr,0',
        },
    ])

    const reply_markup = { inline_keyboard };

    let text = `<b>Choose From Minute</b>`;

    return {text, reply_markup}
}
