const requestManagerClient = require('../request-manager.client');
const userClient = require('../user.client');

module.exports = async (telegram) => {
    let text = `
    <b>Children Pending requests</b>

Please choose a request for making actions.
    `;

    let inline_keyboard = [];

    const pending_request = requestManagerClient.getPendingRequestByStudent(telegram);
    pending_request.forEach(x => {
        inline_keyboard.push(
            [{
                text: `${x.begin} -> ${x.end}: ${x.reason}`,
                callback_data: `srac,${x.id}`,
            }]
        )
    });

    inline_keyboard.push(
        [{
            text: '<< Back to Requests',
            callback_data: 'sr,0',
        }],
    );

    const reply_markup = {inline_keyboard}

    return {text, reply_markup};

}