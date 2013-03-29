var presence = require('./model');

function getPresence(params, callback) {
    if (params.uid) {
        var r = presence.get(params.uid);
        callback(undefined, r);
    } else callback();
}

function putPresence(params, callback) {
    if (params.uid && params.cid && params.status)
        presence.register(params.uid, params.cid, params.status);
    callback();
}

function delPresence(params, callback) {
    if (params.uid && params.cid)
        presence.unregister(params.uid, params.cid);
    callback();
}

function postPresenceQ(params, callback) {
    if (params.uid) {
        var r = presence.query(params.uid);
        callback(undefined, r);
    } else callback();
}

function putSubscription(params, callback) {
    if (params.cid && params.uid)
        presence.subscribe(params.cid, params.uid);
    callback();
}

function delSubscription(params, callback) {
    if (params.cid && params.uid)
        presence.unsubscribe(params.cid, params.uid);
    callback();
}

function getSubscriber(params, callback) {
    if(params.uid) {
        var r = presence.subscribers(params.uid);
        callback(undefined, r);
    }
    callback();
}

var route = {
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

var router = module.exports = function (res, method, params, callback) {
    if (route[res] && route[res][method])
        route[res][method](params, callback);
    else callback();
};