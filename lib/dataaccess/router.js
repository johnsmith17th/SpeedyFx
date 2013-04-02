var handler = require('./handler');
var error = require('../error');

var route = {
    '/user': handler.user,
    '/user/pwd': handler.user.pwd,
    '/user/q': handler.user.q,
    '/contact': handler.contact,
    '/message': handler.message
}

var router = module.exports = function (res, method, params, callback) {

    if (method == 'delete') method = 'del';

    if (route[res] && route[res][method])
        route[res][method](params, callback);
    else callback(error.e404);
};

