const { check } = require('express-validator');
const validateResult = require('../utils/handleValidator');

const validacionGetItem = [
  //va a requerir foto si o si el curriculum
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

module.exports = { validacionGetItem };
