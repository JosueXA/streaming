const http = require('./app');

const port = process.env.PORT || 2000;

http.listen(port, () => {
  console.log(`Aplicación en de desarrollo http://localhost:${port}`);
});
