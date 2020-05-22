

class RequestManagerClient {

    constructor(){}

    getActiveRequestByStudent(id) {
        return [
            {
                id: 'aeds',
                sid: id,
                begin: '6h',
                end: '8h',
                reason: 'Have Party with Class',
            },
        ]
    }

    getPendingRequestByStudent(id) {
        return [
            {
                id: '321',
                sid: id,
                begin: '8h',
                end: '9h',
                reason: 'Extend class party',
            },
            {
                id: '32d1',
                begin: '8dh',
                end: '9dh',
                reason: 'Extdend class party',
            }
        ]
    }

    getPendingRequest(id) {
        return {
            id,
            sid: 'sdffsdfds',
            begin: '8h',
            end: '9h',
            reason: 'Extend class party',
        }
    }

}

const requestManagerClient = new RequestManagerClient();

module.exports = requestManagerClient;