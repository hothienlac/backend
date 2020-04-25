


module.exports = (models) => async (call, callback) => {
    const user = call.request.user;
    models.user.create(user).
        then((item) => {
            callback(null, null);
        }).
        catch((err) => {
            callback(err, null)
        })
}
