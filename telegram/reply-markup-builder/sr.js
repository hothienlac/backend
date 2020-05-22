const reply_markup = {
    inline_keyboard: [
        [{
            text: 'Create new Request',
            callback_data: 'srcfh,0',
        }],
        [{
            text: 'Abort Pending Request',
            callback_data: 'sra,0',
        }],
        [{
            text: '<< Main menu',
            callback_data: 's,0',
        }],
    ]
}

const requestManagerClient = require('../request-manager.client');
const userClient = require('../user.client');

module.exports = async (telegram) => {

    let text = `<b>Your requests</b>\n\n`;

    const active_request = requestManagerClient.getActiveRequestByStudent(telegram);
    text += `You have ${active_request.length} active request:\n`;
    active_request.forEach((element) => {
        text += `* ${element.begin} to ${element.end}: ${element.reason}\n`;
    });
    text += '\n';
    const pending_request = requestManagerClient.getPendingRequestByStudent(telegram);
    text += `and ${pending_request.length} pending request:\n`;
    pending_request.forEach((element) => {
        text += `* ${element.begin} to ${element.end}: ${element.reason}\n`;
    });
    text += '\n';

    return {text, reply_markup}
}
