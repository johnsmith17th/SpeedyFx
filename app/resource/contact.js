var servs = require('../../servs');

function getContact(session, params, callback) {
    servs.d('/contact', 'get', { uid: session.uid, black: false }, callback);
}

function putContact(session, params, callback) {
    var p = { uid: session.uid, cid: params.cid };
    if (params.alias) p.alias = params.alias;
    servs.d('/contact', 'put', p, callback);
}

function delContact(session, params, callback) {
    servs.d('/contact', 'delete', { uid: session.uid, cid: params.cid }, callback);
}

module.exports = {
    get: getContact,
    put: putContact,
    del: delContact
};