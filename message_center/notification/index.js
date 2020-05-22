class Notification {
    constructor(message) {
        this.newRequest = require('./NewRequest')(message);
    }

    getServices() {
        return {
            NewRequest: this.newRequest
        }
    }
}

module.exports = (message)  => {
    services = new Notification(message);
    return services.getServices();
}