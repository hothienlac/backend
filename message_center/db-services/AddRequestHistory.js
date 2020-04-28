module.exports = (models) => async (request) => {
    return models.RequestHistory.create(request);
}