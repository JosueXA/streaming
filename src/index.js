require('dotenv').config();

const http = require('./app');

const port = process.env.PORT || 8081;

http.listen(port, () => {
  console.log(`Aplicación en desarrollo http://localhost:${port}`);
});
