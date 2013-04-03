var error = require('../error');

/**
 * Exports memory store
 */
var MemoryStore = module.exports.MemoryStore = require('./store/memory');

/**
 * Handlers
 */

function getPresence(store, params, callback) {
    if (params.uid)
        var r = store.get(params.uid, callback);
    else callback(error.e400);
}

function putPresence(store, params, callback) {
    if (params.uid && params.cid && params.status)
        store.register(params.uid, params.cid, params.status, callback);
    else callback(error.e400);
}

function delPresence(store, params, callback) {
    if (params.uid && params.cid)
        store.unregister(params.uid, params.cid, callback);
    else callback(error.e400);
}

function postPresenceQ(store, params, callback) {
    if (params.uid && params.uid instanceof Array)
        store.query(params.uid, callback);
    else callback(error.e400);
}

function putSubscription(store, params, callback) {
    if (params.cid && params.uid && params.uid instanceof Array)
        store.subscribe(params.cid, params.uid, callback);
    else callback(error.e400);
}

function delSubscription(store, params, callback) {
    if (params.cid && params.uid && params.uid instanceof Array)
        store.unsubscribe(params.cid, params.uid, callback);
    else callback(error.e400);
}

function getSubscriber(store, params, callback) {
    if (params.uid)
        store.subscribers(params.uid, callback);
    else callback(error.e400);
}

/**
 * Handler router
 */
var router = {
    '/presence': {
        get: getPresence,
        put: putPresence,
        del: delPresence
    },
    '/presence/q': {
        post: postPresenceQ
    },
    '/subscription': {
        put: putSubscription,
        del: delSubscription
    },
    '/subscriber': {
        get: getSubscriber
    }
};

/**
 * Create presence service
 */
var service = module.exports.service = function (store) {

    // use memory store by default
    if (!store)
        store = MemoryStore;

    return function (resource, method, params, callback) {
        if (method == 'delete') method = 'del';
        if (router[resource] && router[resource][method])
            router[resource][method](store, params, callback);
        else callback(error.e404);
    };
};