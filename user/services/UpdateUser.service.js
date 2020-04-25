const status = require('grpc').status;


module.exports = (models) => async (call, callback) => {
    const telegram = call.request.telegram;
    const update = call.request.update;
    const fields = call.request.fields;
    const user = await models.user.findByPk(telegram);
    if (!user) {
        callback({code: status.NOT_FOUND, message: 'User not found!'}, null);
        return;
    }
    // update = update.filter(function(x) { return x !== null });
    const x = {};
    fields.forEach((value, index, array) => x[value]=update[value]);
    console.log(x);
    user.update(update).
        then(() => callback(null, null)).
        catch((err) => callback(err, null));
    // callback(null, null);
}
