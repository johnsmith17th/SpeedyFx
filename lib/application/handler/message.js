var service = require('../../service');
var error = require('../../error');

function getMessage(session, params, callback) {
    service.d('/message', 'get', { uid: session.uid }, function (e, r) {
        var f = [], x;
        if (r && r.length) {
            for (var i in r) {
                x = r[i];
                x = JSON.parse(x.msg);
                f.push(x);
            }
        }
        callback(e, f);
    });
}

function postMessage(session, params, callback) {
    if (!params || !params.message)
        return callback(error.e400);
    var msg = params.message;
    var p = {
        mid: msg.data.id,
        uid: msg.data.to,
        msg: JSON.stringify(msg)
    };
    service.d('/message', 'post', p, callback);
}

function delMessage(session, params, callback) {
    var p = { uid: session.uid };
    if (params.mid) p.mid = params.mid;
    service.d('/message', 'delete', p, callback);
}

module.exports = {
    get: getMessage,
    post: postMessage,
    del: delMessage
}