var service = require('../../service');
var crypto = require('crypto');

var pwdSalt = 'speedyfx-password-salt';

function hmacPassword(key, text) {
    var hash = crypto.createHmac('sha1', key).update(text).digest('hex');
    return hash;
};

function postAuth(session, params, callback) {

    var uid = params.uid,
        pwd = (params.pwd) ? hmacPassword(pwdSalt, params.pwd) : params.pwd;

    service.d('/user', 'get', { uid: uid, pwd: pwd, filter: 'uid' }, function (e, r) {
        if (e) callback(e, false);
        else if (r) callback(e, true);
        else callback(e, false);
    });
};

function postReg(session, params, callback) {

    var p = {
        uid: params.email,
        pwd: (params.pwd) ? hmacPassword(pwdSalt, params.pwd) : params.pwd,
        email: params.email,
        nick: params.nick
    };
    service.d('/user', 'post', p, callback);
};

module.exports = {
    auth: { post: postAuth },
    register: { post: postReg }
};