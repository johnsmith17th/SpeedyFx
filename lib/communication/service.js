var express = require('express'),
    sio = require('socket.io'),
    http = require('http'),
    crypto = require('crypto'),
    connect = require('express/node_modules/connect'),
    cookie = require('express/node_modules/cookie');

var SessionStore = connect.middleware.session.MemoryStore,
    sessionSec = 'session-sec';

var app = module.exports = express();
var sockets = app.sockets = {};
var sessions = app.sessions = new SessionStore();
var handlers = app.handlers = require('./handler');
var services = app.services = require('../service');

app.config(function () {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: sessionSec, store: sessions }));
    app.use(express.methodOverride());
    app.use(app.router);
});

app.post('/auth', function (req, res) {
    var p = {
        uid: req.param('email'),
        pwd: req.param('pwd')
    };
    services.app('/auth', 'post', {}, p, function (e, r) {
        if (r) {
            req.session.sid = req.session.id;
            req.session.uid = p.uid;
            res.send(200, req.sessions.id);
        } else res.send(401, 'Unauthorized');
    });
});

var io = app.io = sio.listen(http.createServer(app), { log: false });

io.set('authorization', function (handshake, callback) {

    handshake.cookie = cookie.parse(handshake.headers.cookie);
    var sid = connect.utils.parseSignedCookie(handshake.cookie['connect.sid'], sessionSec);

    if (sid) {
        sessions.get(sid, function (err, session) {
            if (session) {
                handshake.session = {
                    sid: session.sid,
                    uid: session.uid
                };
                callback(null, true);
            }
            else callback('Session not found', false);
        });
    }
    else callback('Session not found', false);
});

io.sockets.on('connection', function (socket) {

    var session = socket.handshake.session;

    sockets[session.sid] = socket;

    socket.on('message', function (data, callback) {
        if ('function' == typeof (handlers[data.type]))
            handlers[data.type](data);
        callback(true);
    });

    socket.on('disconnect', function () {
        delete sockets[session.sid];
    });
});