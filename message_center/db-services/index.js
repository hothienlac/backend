class Services {

    constructor(models) {
        this.addActiveRequest = require('./AddActiveRequest')(models);
        this.addPendingRequest = require('./AddPendingRequest')(models);
        this.addRequestHistory = require('./AddRequestHistory')(models);
        this.getAllPendingRequests = require('./GetAllPendingRequests')(models);
        this.getAllActiveRequests = require('./GetAllActiveRequests')(models);
        this.getPendingRequestsByStudent = require('./GetPendingRequestsByStudent')(models);
        this.getActiveRequestByStudent = require('./GetActiveRequestByStudent')(models);
        this.getRequestHistory = require('./GetRequestHistory')(models);
        this.removePendingRequests = require('./RemovePendingRequests')(models);
        this.removeUselessPendingRequests = require('./RemoveUselessPendingRequests')(models);
        this.removeOutdatedActiveRequests = require('./RemoveOutdatedActiveRequests')(models);
    }

    getServices() {
        const result = {
            AddActiveRequest: this.addActiveRequest,
            AddPendingRequest: this.addPendingRequest,
            AddRequestHistory: this.addRequestHistory,
            GetAllActiveRequests: this.getAllActiveRequests,
            GetActiveRequestByStudent: this.getActiveRequestByStudent,
            GetAllPendingRequests: this.getAllPendingRequests,
            GetPendingRequestsByStudent: this.getPendingRequestsByStudent,
            GetRequestHistory: this.getRequestHistory,
            RemovePendingRequests: this.removePendingRequests,
            RemoveUselessPendingRequests: this.removeUselessPendingRequests,
            RemoveOutdatedActiveRequests: this.removeOutdatedActiveRequests
        }
        return result;
    }

}


module.exports = (models)  => {
    services = new Services(models);
    return services.getServices();
}