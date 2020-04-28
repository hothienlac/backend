module.exports = (models) => async (request) => {
    return models.PendingRequest.create(request);
}