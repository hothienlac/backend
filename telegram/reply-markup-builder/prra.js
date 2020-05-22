const requestManagerClient = require('../request-manager.client');

module.exports = async (id) => {

    const request = requestManagerClient.getPendingRequest(id);

    const text = `
<b>Make action on:</b>

Children:    ${request.sid}
From:          ${request.begin}
To:                ${request.end}
Reason:      ${request.reason}
`

    const reply_markup = {
        inline_keyboard: [
            [
                {
                    text: 'REJECT',
                    callback_data: `done_review,reject+${id}`,
                },
                {
                    text: 'ACCEPT',
                    callback_data: `done_review,accept+${id}`,
                },
            ],
            [{
                text: '<< Back to Pending Request Review',
                callback_data: 'prr,0',
            }],
        ]
    }

    return {text, reply_markup}
}