


const requestManagerClient = require('../request-manager.client');
const userClient = require('../user.client');

module.exports = async (previous) => {

    let inline_keyboard = [];

    for (i = 0; i < 4; i++) {
        let x = [];
        for (j = 0; j < 3; j++) {
            const h = i*3 + j;
            x.push({
                text: `${h}`,
                callback_data: `srctm,${previous}+${h}`,
            })
        };
        inline_keyboard.push(x);
    };

    inline_keyboard.push([
        {
            text: '<< Cancel',
            callback_data: 'sr,0',
        },
    ]);

    const reply_markup = { inline_keyboard };

    let text = `<b>Choose To Hour</b>`;

    return {text, reply_markup};
}
