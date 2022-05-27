const { handleHttpError } = require('../utils/handleError');
const { verifyToken } = require('../utils/handleJwt');
const { usuarioModel } = require('../models');
const getProperties = require('../utils/handlePropertiesEngine');
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
  try {
    //preguntamos si el encabezado trae un token
    if (!req.headers.authorization) {
      handleHttpError(res, 'No tiene TOKEN', 401);
      return;
    }

    //hacemos q divida esta cadena en un espacio (bearer 121212454) y tomamos solo el token
    const token = req.headers.authorization.split(' ').pop();
    //verificamos q el token sea firmado/q sea valido
    const dataToken = await verifyToken(token);

    //si dataToken viene null o vacio
    if (!dataToken) {
      handleHttpError(res, 'No contiene información, jwt', 401);
      return;
    }

    //armo la query dinamica deacuerdo a la base a la cualq estoy conectado
    const query = { [propertiesKey.id]: dataToken[propertiesKey.id] };

    //el methodo findOne funciona en mysql como en mongo
    const user = await usuarioModel.findOne(query);
    req.user = user;
    //le todo va bien le decimos q pase next()
    next();
  } catch (error) {
    handleHttpError(res, 'No tiene sesion iniciada', 401);
    return;
  }
};
module.exports = authMiddleware;
