var servs = require('../../servs');

function getBlacklist(session, params, callback) {
    servs.d('/contact', 'get', { uid: session.uid, black: true }, callback);
}

function putBlacklist(session, params, callback) {
    var p = { uid: session.uid, cid: params.cid, black: true };
    if (params.alias) p.alias = params.alias;
    servs.d('/contact', 'put', p, callback);
}

function delBlacklist(session, params, callback) {
    servs.d('/contact', 'delete', { uid: session.uid, cid: params.cid }, callback);
}

module.exports = {
    get: getContact,
    put: putContact,
    del: delContact
};