module.exports = (models) => async (offset, limit) => {
    return models.RequestHistory.findAll({offset, limit});
}