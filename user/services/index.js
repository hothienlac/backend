

class Services {

    constructor(models) {
        this.createRelationship = require('./CreateRelationship.service')(models);
        this.createUser = require('./CreateUser.service')(models);
        this.getRoleByEmail = require('./GetRoleByEmail.service')(models);
        this.getRoleByTelegram = require('./GetRoleByTelegram.service')(models);
        this.getAllUsers = require('./GetAllUsers.service')(models);
        this.getParentsByTelegram = require('./GetParentsByTelegram.service')(models);
        this.getChildrenByTelegram = require('./GetChildrenByTelegram.service')(models);
        this.updateUser = require('./UpdateUser.service')(models);
    }

    getServices() {
        const result = {
            CreateRelationship: this.createRelationship,
            CreateUser: this.createUser,
            GetRoleByEmail: this.getRoleByEmail,
            GetRoleByTelegram: this.getRoleByTelegram,
            GetAllUsers: this.getAllUsers,
            GetParentsByTelegram: this.getParentsByTelegram,
            UpdateUser: this.updateUser,
            GetChildrenByTelegram: this.getChildrenByTelegram,
        }
        return result;
    }

}


module.exports = (models)  => {
    services = new Services(models);
    return services.getServices();
}