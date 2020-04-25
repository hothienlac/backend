const status = require('grpc').status;


module.exports = (models) => async (call, callback) => {
    const telegram = call.request.telegram;
    console.log('abc');
    const user = await models.user.findByPk(telegram);
    if (!user) {
        console.log('not pass');
        callback({code: status.NOT_FOUND, message: 'User not found!'}, null);
        return;
    }
    console.log('pass');
    let children = await user.getChildren();
    children = children.map((x) => x.dataValues);
    callback(null, {children});
}