var service = require('../../service');

function getMessage(session, params, callback) {
    service.d('/message', 'get', { uid: session.uid }, callback);
};

function delMessage(session, params, callback) {
    var p = { uid: session.uid };
    if (params.mid) p.mid = params.mid;
    service.d('/message', 'delete', p, callback);
}

module.exports = {
    get: getMessage,
    del: delMessage
}