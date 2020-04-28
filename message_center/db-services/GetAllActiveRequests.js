module.exports = (models) => async () => {
    return models.ActiveRequest.findAll();
}