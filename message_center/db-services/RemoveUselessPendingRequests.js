const { Op } = require('sequelize');
const moment = require('moment');


module.exports = (models) => async () => {
    return models.PendingRequest.destroy({
        where: {
            end: {
                [Op.lt]: moment()
            }
        }
    });
}
