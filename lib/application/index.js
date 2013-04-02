var resource = require('./resource');
var error = require('../error');

var router = {
    '/auth': resource.account.auth,
    '/register': resource.account.register,
    '/user': resource.user,
    '/user/contact': resource.contact,
    '/user/blacklist': resource.blacklist,
    '/user/message': resource.message
}

var service = module.exports.service = function service(res, method, session, params, callback) {
    if (method == 'delete') method = 'del';
    if (router[res] && router[res][method])
        router[res][method](session, params, callback);
    else callback(error.e404);
};