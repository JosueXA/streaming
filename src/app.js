const express = require('express');
const app = express();

// Creamos un servidor http a partir de la libreria express
const http = require('http').Server(app);

// Para generar una comunicación vamos a trabajar con socket.io
const io = require('socket.io')(http);

// Routes
app.use(require('./routes/littlezoom.routes'));

// Carga de archivos estaticos html con los que se trabajarán
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  // console.log('Usuario conectado');

  socket.on('stream', (image) => {
    // Emitir el evento a todos los sockets conectados
    socket.broadcast.emit('stream', image);
  });

});

module.exports = http;