const jwt = require('jsonwebtoken');

//debo pasar el objeto del usuario(name, password)
const tokenSign = async user => {
  //le vamos a indicar q vamos a firmar el token y nos devuelve jwt
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );
};

//verificamos q el token este firmado por nosotros
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
