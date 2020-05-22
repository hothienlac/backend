module.exports = (models, notification) => (CreateRequestRequest) => {
    created = models.PendingRequest.create(CreateRequestRequest);
    notification.NewRequest(created);
}