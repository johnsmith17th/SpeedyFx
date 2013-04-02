var error = require('../error');

/**
 * Handler router implemented with mongodb
 */
var MongoAccess = module.exports.MongoAccess = require('./handler/mongo').router;

/**
 * Create data service
 */
var service = module.exports.service = function (router) {

    // use mongodb data access by default
    if (!router)
        router = MongoAccess;

    return function (resource, method, params, callback) {
        if (method == 'delete') method = 'del';
        if (router && router[resource] && router[resource][method])
            router[resource][method](params, callback);
        else callback(error.e404);
    }
}