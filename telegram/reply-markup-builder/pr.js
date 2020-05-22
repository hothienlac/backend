const reply_markup = {
    inline_keyboard: [
        [{
            text: 'Review Pending Request',
            callback_data: 'prr,0',
        }],
        [{
            text: '<< Main menu',
            callback_data: 'p,0',
        }],
    ]
}

const requestManagerClient = require('../request-manager.client');
const userClient = require('../user.client');

module.exports = async (telegram) => {
    let text = `<b>Children requests\n\n</b>`;

    const {children} = await userClient.getChildren('1161835302');

    children.forEach((element) => {
        const active_request = requestManagerClient.getActiveRequestByStudent(element.telegram);
        text += `<b>${element.name}</b>\n\n`;
        text += `Has ${active_request.length} active request:\n`;
        active_request.forEach((element) => {
            text += `* ${element.begin} to ${element.end}: ${element.reason}\n`;
        });
        text += '\n';
        const pending_request = requestManagerClient.getPendingRequestByStudent(element.telegram);
        text += `Has ${pending_request.length} pending request:\n`;
        pending_request.forEach((element) => {
            text += `* ${element.begin} to ${element.end}: ${element.reason}\n`;
        });
        text += '\n';
    });

    return {text, reply_markup}
}
