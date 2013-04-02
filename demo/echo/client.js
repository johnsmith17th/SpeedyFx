var sio = require('socket.io-client')
var socket = sio.connect('http://localhost:8080');

socket.on('connect', function () {

    socket.on('news', function (data) {
        console.log('News: ' + data.message);
    });

    socket.on('echo', function (data) {
        console.log('Echo: ' + data.message);
    });
});

var some = setInterval(function () {
    socket.emit('echo', { message: 'something for echo' });
}, 1000);