const { check } = require('express-validator');
const validateResult = require('../utils/handleValidator');

const validacionCreateItem = [
  //validamos q exista, q no sea vacio y tenga un min de 5 y un max...
  check('name').exists().notEmpty().isLength({ min: 5, max: 90 }),
  check('age').exists().notEmpty(),
  check('email').exists().notEmpty(),
  check('linkedin').exists(),
  check('estudios.nivelEstudio').exists(),
  check('estudios.estado').exists(),
  check('estudios.titulo').exists(),
  check('cursos.nombre').exists(),
  check('cursos.estado').exists(),
  check('experiencia.trabajo').exists(),
  check('experiencia.tareas').exists(),
  check('experiencia.referencia').exists(),
  //va a requerir foto si o si el curriculum
  check('relId').exists().notEmpty(),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];
const validacionGetItem = [
  //va a requerir foto si o si el curriculum
  check('id').exists().notEmpty(),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

module.exports = { validacionCreateItem, validacionGetItem };
