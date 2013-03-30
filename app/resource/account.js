var servs = require('../../servs');
var crypto = require('crypto');

var pwdSalt = 'speedyfx-password-salt';

function hmacPassword(key, text) {
    var hash = crypto.createHmac('sha1', key).update(text).digest('hex');
    return hash;
};

function auth(session, params, callback) {

    var uid = params.uid,
        pwd = (params.pwd) ? hmacPassword(pwdSalt, params.pwd) : params.pwd;

    servs.d('/user', 'get', { uid: uid, pwd: pwd, filter: 'uid' }, callback);
};

function reg(session, params, callback) {

    if (params.pwd) params.pwd = hmacPassword(pwdSalt, params.pwd);

    servs.d('/user', 'post', params, callback);
};

module.exports = {
    auth: { post: auth },
    register: { post: reg }
};