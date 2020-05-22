const requestManagerClient = require('../request-manager.client');

module.exports = async (id) => {

    const request = requestManagerClient.getPendingRequest(id);

    const text = `
<b>Are you sure to abort pending request:</b>

From:          ${request.begin}
To:                ${request.end}
Reason:      ${request.reason}
`

    const reply_markup = {
        inline_keyboard: [
            [
                {
                    text: '<< No, Bring me back',
                    callback_data: `sra,0`,
                },
                {
                    text: 'Yes, ABORT IT FOR ME',
                    callback_data: `done_abort,${id}`,
                },
            ],
        ]
    }

    return {text, reply_markup}
}