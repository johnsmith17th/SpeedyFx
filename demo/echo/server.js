var app = require('http').createServer();
var sio = require('socket.io').listen(app, { log: false });

app.listen(8080, function () {
    console.log('Server start on %d', 8080);
});

sio.sockets.on('connection', function (socket) {

    socket.emit('news', { message: 'Hello world!' });

    socket.on('echo', function (data) {
        console.log('Echo: ' + data.message);
        socket.emit('echo', data);
    });

    socket.on('disconnect', function () {
        console.log('Client disconnect');
    });
});