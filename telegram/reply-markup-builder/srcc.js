

const requestManagerClient = require('../request-manager.client');
const userClient = require('../user.client');

module.exports = async (previous) => {

    const form = previous.split('+');

    if (form.length < 5) {
        return await require('./error')('Length < 5');
    }

    let text = `<b>Are you sure to submit request?</b>\n\n`;
    text += `Request Summary:\n`;
    text += `From:          ${form[0]}h ${form[1]}m\n`;
    text += `To:                ${form[2]}h ${form[3]}m\n`;
    text += `Reason:      ${form[4]}`;

    const reply_markup = {
        inline_keyboard: [
            [
                {
                    text: '<< NO! BRING ME BACK!',
                    callback_data: 'sr,0',
                },
                {
                text: 'Yes, I Sure',
                callback_data: `done_request,${previous}`,
                }
            ],
        ]
    }

    return {text, reply_markup}
}
