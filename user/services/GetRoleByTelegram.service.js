const status = require('grpc').status;


module.exports = (models) => async (call, callback) => {
    const telegram = call.request.telegram;
    const user = await models.user.findOne({where: {telegram}});
    if (!user) {
        callback({code: status.NOT_FOUND, message: 'User not found!'}, null);
        return;
    }
    callback(null, {role: user.role});
}
