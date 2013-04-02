var service = require('../../service');

function getBlacklist(session, params, callback) {
    service.d('/contact', 'get', { uid: session.uid, black: true }, function (e, r) {
        if (r && r.length) {
            var map = {}, uid = [], x;
            for (var i in r) {
                x = r[i];
                if (x.alias) map[cid] = x.alias;
                uid.push(x.cid);
            }
            service.d('/user/q', 'post', { uid: uid }, function (e1, r1) {
                if (r1) {
                    r1.forEach(function (obj, i, arr) {
                        arr[i] = obj.toObject();
                        x = arr[i];
                        if (map[x.uid]) x.alias = map[x.uid];
                    });
                }
                callback(e1, r1);
            });
        }
        else callback(e, r);
    });
}

function putBlacklist(session, params, callback) {
    var p = { uid: session.uid, cid: params.cid, black: true };
    if (params.alias) p.alias = params.alias;
    service.d('/contact', 'put', p, callback);
}

function delBlacklist(session, params, callback) {
    service.d('/contact', 'delete', { uid: session.uid, cid: params.cid }, callback);
}

module.exports = {
    get: getBlacklist,
    put: putBlacklist,
    del: delBlacklist
};