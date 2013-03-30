var express = require('express'),
    sio = require('socket.io');

var parseCookie = express.connect.utils.parseCookie,
    SessionStore = express.connect.middleware.session.memory;

var app = module.exports = express();
var sockets = app.sockets = {};
var sessions = app.sessions = new SessionStore();
var handlers = app.handlers = require('./handler');
var services = app.services = require('../servs');

app.config(function () {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'speedfx', store: sessions }));
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
            req.session.uid = p.uid;
            res.send(200, req.sessions.id);
        } else res.send(401, 'Unauthorized');
    });
});

app.post('/register', function (req, res) {

});

var io = app.io = sio.listen(app);

io.set('authorization', function (handshakeData, callback) {

    handshakeData.cookie = parseCookie(handshakeData.headers.cookie);

    var sid = handshakeData.cookie['sid'],
        uid = handshakeData.cookie['uid'];

    if (sid) {
        sessions.get(sid, function (err, session) {
            if (err) callback(err.message, false);
            else {
                handshakeData.sid = sid;
                handshakeData.uid = uid;
                callback(null, true);
            }
        });
    }
    else callback('no session');
});

io.sockets.on('connection', function (socket) {

    var sid = socket.handshake.sid;

    socket.on('message', function (msg, callback) {
        msg = JSON.parse(msg);
        if (handlers[msg.type])
            handlers[msg.type](app, socket, msg);
        callback(true);
    });

    socket.on('disconnect', function () {
        delete app.sockets[sid];
    });
});