var user = require('./user');
var contact = require('./contact');
var message = require('./message');

var router = module.exports.router = {
    '/user': user,
    '/user/pwd': user.pwd,
    '/user/q': user.q,
    '/contact': contact,
    '/message': message
};