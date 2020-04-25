const status = require('grpc').status;


module.exports = (models) => async (call, callback) => {
    const email = call.request.email;
    const user = await models.user.findOne({where: {email}});
    if (!user) {
        callback({code: status.NOT_FOUND, message: 'User not found!'}, null);
        return;
    }
    callback(null, {role: user.role});
}
