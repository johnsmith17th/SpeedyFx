var handler = require('./handler');
var error = require('../error');

var router = {
    '/auth': handler.account.auth,
    '/register': handler.account.register,
    '/user': handler.user,
    '/user/contact': handler.contact,
    '/user/blacklist': handler.blacklist,
    '/user/message': handler.message
}

var service = module.exports.service = function service(resource, method, session, params, callback) {
    if (method == 'delete') method = 'del';
    if (router[resource] && router[resource][method])
        router[resource][method](session, params, callback);
    else callback(error.e404);
};