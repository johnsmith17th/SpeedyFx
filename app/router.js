var resource = require('./resource');
var error = require('./error');

var route = {
    '/auth': resource.account.auth,
    '/register': resource.account.register,
    '/user': resource.user,
    '/user/contact': resource.contact,
    '/user/blacklist': resource.blacklist,
    '/user/message': resource.message
}

var router = module.exports = function (res, method, session, params, callback) {

    if (route[res] && route[res][method])
        route[res][method](session, params, callback);
    else callback(model.errors.e404);
};