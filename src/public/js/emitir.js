const canvas = document.querySelector('#preview');
const context = canvas.getContext('2d');
const btnEmitir = document.querySelector('#btnEmitir');
const btnStop = document.querySelector('#btnStop');

canvas.style.display = 'none';
canvas.width = 512;
canvas.height = 384;

context.width = canvas.width;
context.height = canvas.height;

const video = document.querySelector('#video');

const socket = io();

const publicarMensaje = ( msg ) => {
  document.querySelector('.status').innerText = msg;
}

const cargarCamara = ( stream ) => {
  video.srcObject = stream;
  publicarMensaje('Cámara funcionando');
}

const errorCamara = () => {
  publicarMensaje('Error al cargar la cámara');
}

const verVideo = ( video, context ) => {
  context.drawImage(video, 0, 0, context.width, context.height);
  socket.emit('stream', canvas.toDataURL('image/webp'));
}

const detenerVideo = () => {
  video.srcObject.getTracks().forEach( track => track.stop() );
  publicarMensaje('Cámara detenida');
}

btnEmitir.addEventListener('click', () => {
  navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia );

  if ( navigator.getUserMedia ) {
    navigator.getUserMedia({ video: true }, cargarCamara, errorCamara);
  }

  let intervalo = setInterval(() => {
    verVideo(video, context);
  }, 1000 / 30 );

  btnEmitir.textContent = 'Emitiendo...';

});

btnStop.addEventListener('click', () => {
  detenerVideo();
  btnEmitir.textContent = 'Emitir';
});