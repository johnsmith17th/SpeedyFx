var resource = require('./resource');
var model = require('./model');

var route = {
    '/user': resource.user,
    '/user/pwd': resource.user.pwd,
    '/user/q': resource.user.q,
    '/contact': resource.contact,
    '/message': resource.message
}

var router = module.exports = function (res, method, params, callback) {

    if (route[res] && route[res][method])
        route[res][method](params, callback);
    else callback(model.errors.e404);
};

