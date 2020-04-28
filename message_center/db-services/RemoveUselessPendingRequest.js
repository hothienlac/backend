const Op = Sequelize.Op;
const moment = require('moment');


module.exports = (models) => async () => {
    models.PendingRequest.destroy({
        where: {
            end: {
                [Op.lt]: moment()
            }
        }
    })
}
