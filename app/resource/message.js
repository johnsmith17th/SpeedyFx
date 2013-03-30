var servs = require('../../servs');

function getMessage(session, params, callback) {
    servs.d('/message', 'get', { uid: session.uid }, callback);
};

function delMessage(session, params, callback) {
    var p = { uid: session.uid };
    if (params.mid) p.mid = params.mid;
    servs.d('/message', 'delete', p, callback);
}