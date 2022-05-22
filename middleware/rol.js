const { handleHttpError } = require('../utils/handleError');
const checkRol = roles => (req, res, next) => {
  try {
    //extraemos el usuario de req , se inyecto en session
    const { user } = req;
    //extraemos los roles del usuario
    const roleByUser = user.roles;
    //tomamos el array y lo comparo con el de usuario a ver si tiene algun permiso asignado
    const checkValueRol = roles.some(rolSinlge =>
      roleByUser.includes(rolSinlge)
    ); //devuelve true o false

    if (!checkValueRol) {
      handleHttpError(res, 'El usuario no tiene permisos!', 403);
      return;
    }

    netx();
  } catch (error) {
    handleHttpError(res, 'Ocurrió un error con los permisos!', 403);
  }
};

module.exports = checkRol;
