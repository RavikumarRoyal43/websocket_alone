const port = process.env.PORT || 3000

const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origins: ['*']
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('test');
});

io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('my message', (msg) => {
        console.log('message: ' + msg);
        io.emit('my broadcast', `${msg}`);
    });

    socket.on('my broadcast', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit('my broadcast', `${msg}`);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});