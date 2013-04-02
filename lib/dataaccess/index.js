var error = require('../error');

/**
 * Handler router implemented with mongodb
 */
var MongoAccess = require('./handler/mongo').router;

/**
 * Create data service
 */
var service = module.exports.service = function (router) {

    // use mongodb data access by default
    if (!router)
        router = MongoAccess;

    return function (resource, method, params, callback) {
        if (method == 'delete') method = 'del';
        if (router && router[res] && router[res][method])
            router[res][method](params, callback);
        else callback(error.e404);
    }
}