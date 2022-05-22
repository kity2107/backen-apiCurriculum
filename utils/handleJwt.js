const jwt = require('jsonwebtoken');

//de esta foma es una ayuda q nos muestra al importar la funcion , con los params a pasar y demas
/**
 * Encrypt textplain
 * @param {*} textPlain
 * @returns
 */

//debo pasar el objeto del usuario(name, password)
const tokenSign = async user => {
  //le vamos a indicar q vamos a firmar el token y nos devuelve jwt
  return jwt.sign(
    {
      //payload
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      //argumento adicional una fecha de expiracion
      expiresIn: '2h',
    }
  );
};

//verificamos q el token este firmado por nosotros(backend)
//debe pasar el token de sesion
const verifyToken = async token => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
};

const decodeSign = token => {
  return jwt.decode(token, null);
};

module.exports = { tokenSign, decodeSign, verifyToken };
