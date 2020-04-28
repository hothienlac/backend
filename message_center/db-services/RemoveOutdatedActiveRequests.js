const { Op } = require('sequelize');
const moment = require('moment');

module.exports = (models) => async () => {
    return models.ActiveRequest.destroy({
        where: {
            end: {
                [Op.lt]: moment()
            }
        }
    });
}