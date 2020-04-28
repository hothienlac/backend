module.exports = (models) => async () => {
    return models.PendingRequest.findAll();
}