import { io } from 'socket.io-client';
io.connect('localhost:3000')

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

