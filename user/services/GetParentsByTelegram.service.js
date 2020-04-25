const status = require('grpc').status;


module.exports = (models) => async (call, callback) => {
    const telegram = call.request.telegram;
    const user = await models.user.findByPk(telegram);
    if (!user) {
        callback({code: status.NOT_FOUND, message: 'User not found!'}, null);
        return;
    }
    let parents = await user.getParents();
    parents = parents.map((x) => x.dataValues);
    callback(null, {parents});
}