/**
 * Publish notification to target client
 */
function notify(sockets, targets, data) {
    if (targets && targets.length) {
        var c, s,
            m = { type: 'prs', body: { type: 'notify', notify: data} };
        for (var i in targets) {
            c = targets[i];
            s = sockets[c];
            if (s) s.emit('message', m);
        }
    }
}

/**
 * Register presence of client
 * and send notification to subscribers
 */
function register(app, socket, d) {
    var session = socket.session;
    var params = {
        uid: session.uid,
        cid: session.cid,
        status: d.body.status
    };
    app.services.prs('/presence', 'put', params, function (e1, r1) {
        app.services.prs('/subscriber', 'get', { uid: session.uid }, function (e2, r2) {
            notify(app.sockets, r2, [params]);
        });
    });
}

/**
 * Unregister presence of client
 * and send notification to subscribers
 */
function unregister(app, socket, d) {
    var session = socket.session;
    var params = {
        uid: session.uid,
        cid: session.cid,
        status: 'offline'
    };
    app.services.prs('/presence', 'delete', params, function (e1, r1) {
        app.services.prs('/subscriber', 'get', { uid: session.uid }, function (e2, r2) {
            notify(app.sockets, r2, [params]);
        });
    });
}

/**
 * Subscribe presence of user
 */
function subscribe(app, socket, d) {
    var session = socket.session;
    var params = {
        cid: session.cid,
        uid: d.body.subscribe
    };
    app.service.prs('/subscription', 'put', params, function (e1, r1) {
        app.service.prs('/presence/q', 'post', params, function (e2, r2) {
            notify(app.sockets, [session.cid], r2);
        });
    });
}

/**
 * Unsubscribe presence of user
 */
function unsubscribe(app, socket, d) {
    var session = socket.session;
    var params = {
        cid: session.cid,
        uid: d.body.unsubscribe
    };
    app.service.prs('/subscription', 'delete', params, function (e1, r1) {
        // do nothing...
    });
}

/**
 * Fetch presence information of users
 */
function fetch(app, socket, d) {
    var session = socket.session;
    var params = {
        uid: d.body.fetch
    };
    app.service.prs('/presence/q', 'post', params, function (e, r) {
        notify(app.sockets, [session.cid], r);
    });
}

var router = {
    'register': register,
    'unregister': unregister,
    'subscribe': subscribe,
    'unsubscribe': unsubscribe,
    'fetch': fetch
};

module.exports = function (app, socket, d) {
    if (d.type && router[d.type])
        router[d.type](app, socket, d);
};