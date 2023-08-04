const socket = io();
    
    socket.on('stream', ( image ) => {
      document.querySelector('#play').src = image;
    });