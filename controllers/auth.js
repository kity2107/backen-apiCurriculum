const { matchedData } = require('express-validator');
const { encrypt, compare } = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleError');
const { usuarioModel } = require('../models');

//este controlador es el encargado de registrar un usuario
const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    //encripta la pass
    const password = await encrypt(req.password);
    //metemos la pass encriptada dentro del body
    const body = { ...req, password };
    //creamos el usuario
    const dataUser = await usuarioModel.create(body);
    //seteo el data para q no muestre la pass en la respuesta
    dataUser.set('password', undefined, { strict: false });

    const data = {
      //a la funcion le pasamo el objeto del usuario
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error en registerCtrl');
  }
};

//este controlador es el enargado de login de un usuario
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    //buscamos en la base de datos el usuario por el mail
    const user = await usuarioModel
      .findOne({ email: req.email })
      .select('password name role email'); //aplicamos el filtro select y pedimos q traiga pass debido a q en el modelo agregamos el select:false
    // si el usuario no existe.......

    if (!user) {
      handleHttpError(res, 'El usuario no existe', 404);
      return;
    }
    //si el usuario existe la pass q recuperamos de la base la metemos en una const
    const hashPassword = user.get('password');
    //llamamos al metodo compare q para verificar la pass(bcrypt)
    const check = await compare(req.password, hashPassword);
    //si la pass es invalida
    if (!check) {
      handleHttpError(res, 'Password incorrecta', 401);
      return;
    }
    //seteamos para q la data no devuelva la pass, si los demas datos..
    user.set('password', undefined, { strict: false });
    //si todo es correcto le pasamos a tokenSing el usuario asi firmamos el token y tenemos 2hs
    const data = { token: await tokenSign(user), user };

    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error en loginCtrl');
  }
};

module.exports = { registerCtrl, loginCtrl };
