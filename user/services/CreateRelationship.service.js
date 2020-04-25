const status = require('grpc').status;


module.exports = (models) => async (call, callback) => {
    const parentsTelegram = call.request.parentTelegram;
    const childrenTelegram = call.request.childTelegram;
    const parent = await models.user.findByPk(parentsTelegram);
    const child = await models.user.findByPk(childrenTelegram);
    if (!parent) {
        callback({code: status.NOT_FOUND, message: 'Parent not found!'}, null);
        return;
    }
    if (!child) {
        callback({code: status.NOT_FOUND, message: 'Chilren not found!'}, null);
        return;
    }
    parent.addChildren(child);
    callback(null, null)
}