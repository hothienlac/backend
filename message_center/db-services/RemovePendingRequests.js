module.exports = (models) => async (id) => {
    return models.PendingRequest.destroy({
        where: {id}
    });
}
