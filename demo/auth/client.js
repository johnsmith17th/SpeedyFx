var sio = require('socket.io-client')
var socket = sio.connect('http://localhost:8080?sec=12345');

socket.on('connect', function () {

    console.log('Connected');

    socket.on('greeting', function (data) {
        console.log('Greeting: ' + data.message);
    });
});