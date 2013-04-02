var service = require('../../service');

function getUser(session, params, callback) {
    service.d('/user', 'get', { uid: params.uid }, callback);
};

module.exports = {
    get: getUser
};