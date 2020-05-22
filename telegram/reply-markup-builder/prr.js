const requestManagerClient = require('../request-manager.client');
const userClient = require('../user.client');

module.exports = async (telegram) => {
    let text = `
    <b>Children Pending requests</b>

Please choose a request for making actions.
    `;

    let inline_keyboard = [];

    const children = await userClient.getChildren('1161835302');

    children.forEach(element => {
        const pending_request = requestManagerClient.getPendingRequestByStudent(element.telegram);
        pending_request.forEach(x => {
            inline_keyboard.push(
                [{
                    text: `${element.name}: ${x.begin} -> ${x.end}: ${x.reason}`,
                    callback_data: `prra,${x.id}`,
                }]
            )
        });
    });

    inline_keyboard.push(
        [{
            text: '<< Back to Requests',
            callback_data: 'pr,0',
        }],
    );

    const reply_markup = {inline_keyboard}

    return {text, reply_markup};

}