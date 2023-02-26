const port = process.env.PORT || 3000

const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const { Server } = require("socket.io");
const compression = require('compression')
const path = require("path");

app.use(compression());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/", express.static(path.join(__dirname, "../", "dist")));

const io = new Server(server, {
    cors: {
        origins: ['*']
    }
});

app.use(cors());

app.get('/test', (req, res) => {
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

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../", "dist", "index.html"));
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});