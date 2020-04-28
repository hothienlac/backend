module.exports = (models) => async (request) => {
    return models.ActiveRequest.create(request);
}