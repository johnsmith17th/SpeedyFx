var servs = require('../../servs');

function getUser(session, params, callback) {
    servs.d('/user', 'get', { uid: params.uid }, callback);
};

module.exports = {
    get: getUser
};