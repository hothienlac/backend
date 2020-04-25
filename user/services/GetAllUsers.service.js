


module.exports = (models) => async (call, callback) => {
    const offset = call.request.offset;
    const limit = call.request.limit;
    models.user.findAll({offset, limit}).
        then((items) => {
            callback(null, {users: items.map((x) => x.dataValues)});
        }).
        catch((err) => {
            callback(err, null)
        })
}