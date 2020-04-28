module.exports = (models) => async (sid) => {
    return models.PendingRequest.findAll({
        where: {sid}
    });
}