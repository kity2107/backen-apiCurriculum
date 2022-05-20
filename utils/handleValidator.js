const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
  try {
    //si hay un error en la validacion salta al catch
    validationResult(req).throw();
    //sino existe un error en la validacion next
    return next();
  } catch (error) {
    res.status(403);
    res.send({ errors: error.array() });
  }
};

module.exports = validateResult;
