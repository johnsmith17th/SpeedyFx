var service = require('../../service');

function getContact(session, params, callback) {
    service.d('/contact', 'get', { uid: session.uid, black: false }, function (e, r) {
        if (r && r.length) {
            var map = {}, uid = [], x;
            for (var i in r) {
                x = r[i];
                if (x.alias) map[x.cid] = x.alias;
                uid.push(x.cid);
            }
            service.d('/user/q', 'post', { uids: uid }, function (e1, r1) {
                if (r1 && r1.length) {
                    for (var i in r1) {
                        x = r1[i];
                        if (map[x.uid]) x.alias = map[x.uid];
                    }
                }
                callback(e1, r1);
            });
        }
        else callback(e, r);
    });
}

function putContact(session, params, callback) {
    var p = { uid: session.uid, cid: params.cid, black: false };
    if (params.alias) p.alias = params.alias;
    service.d('/contact', 'put', p, callback);
}

function delContact(session, params, callback) {
    service.d('/contact', 'delete', { uid: session.uid, cid: params.cid }, callback);
}

module.exports = {
    get: getContact,
    put: putContact,
    del: delContact
};