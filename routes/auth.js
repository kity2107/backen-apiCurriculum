const express = require('express');
const { matchedData } = require('express-validator');
const router = express.Router();
const { encrypt, compare } = require('../utils/handlePassword');
const { validateRegister, validateLogin } = require('../validators/auth');
const { usuarioModel } = require('../models');

//http:localhost:3001/api/auth/login
//http:localhost:3001/api/auth/register
//crear item
router.post('/register', validateRegister, async (req, res) => {
  req = matchedData(req);
  const password = await encrypt(req.password);
  const body = { ...req, password };
  const data = await usuarioModel.create(body);
  //seteo el data apra no muestre la pass en la respuesta
  data.set('password', undefined, { strict: false });

  res.send({ data });
});

module.exports = router;
