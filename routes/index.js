const fs = require('fs');
const epxress = require('express');
const router = epxress.Router();

const pathRouter = `${__dirname}`;

const removeExtension = fileName => {
  //tranformo el nombre del archivo en un array y extraigo la primera parte sin el punto
  return fileName.split('.').shift();
};

fs.readdirSync(pathRouter).filter(file => {
  //llegan todos los nombres de los archivos q estan dentro de rutas inclusive index
  const nombreRuta = removeExtension(file);
  //pregunto si el archivo q leo es index 'true' o 'false'
  const skip = ['index'].includes(nombreRuta);

  if (!skip) {
    router.use(`/${nombreRuta}`, require(`./${nombreRuta}`)); //TODO: localhost/users
    console.log('CARGAR RUTA ---->', nombreRuta);
  }
});

router.get('*', (req, res) => {
  res.status(404);
  res.send({ error: 'Not found' });
});

module.exports = router;
