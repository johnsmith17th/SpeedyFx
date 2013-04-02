var app = require('http').createServer();
var sio = require('socket.io').listen(app, { log: false });

app.listen(8080, function () {
    console.log('Server start on %d', 8080);
});

/**
 * Global authorization
 */
sio.set('authorization', function (handshake, accept) {

    var sec = handshake.query.sec;

    if (sec == '12345')
        accept(null, true);
    else accept('Fail to authorize');
});

sio.sockets.on('connection', function (socket) {

    console.log('Client connected');

    socket.emit('greeting', { message: 'Hello world' });

    socket.on('disconnect', function () {
        console.log('Client disconnect');
    });
});