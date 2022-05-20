const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //hubicacion donde se van a guardar las imagenes
    const pathStorage = `${__dirname}/../storage`;
    //a la func. cb se le pasa dos args. null en errores y la hubicacion
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    //toma el ultimo valor de un array .pop()
    const ext = file.originalname.split('.').pop();
    //arma el nombre dentro de una variable
    const newName = `file-${Date.now()}.${ext}`;
    cb(null, newName);
  },
});
const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
