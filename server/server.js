const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const middleware = require('socketio-wildcard');

const expressApp = express();
const server = http.createServer(expressApp);
const io = socketIO(server, { origins: '*:*' });
const app = io.of('app');
app.use(middleware());
const display = io.of('display');
display.use(middleware());

const port = process.env.PORT || 3000;
server.listen(port);
const appSockets = {};
app.on('connection', (socket) => {
    appSockets[socket.id] = socket;
    console.log('app connected');
    display.emit('connect', socket.id);
    socket.on('disconnect', () => {
        delete appSockets[socket.id];
        console.log('app disconnected');
        display.emit('disconnect', socket.id);
    });
    socket.on('*', (packet) => {
        display.emit('message', socket.id, packet.data[0]);
    });
    socket.emit('connected');
});

display.on('connection', (socket) => {
    console.log('display connected');
    socket.on('*', (packet) => {
        console.dir(packet);
        const targetId = packet.data[0];
        const message = packet.data[1];
        if (appSockets.hasOwnProperty(targetId)) {
            appSockets[targetId].emit('message', message);
        }
    });
});
