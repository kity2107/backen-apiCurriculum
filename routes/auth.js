const express = require('express');
const { registerCtrl, loginCtrl } = require('../controllers/auth');
const router = express.Router();
const { validateRegister, validateLogin } = require('../validators/auth');

//http:localhost:3001/api/auth/login
//http:localhost:3001/api/auth/register
//crear item
router.post('/register', validateRegister, registerCtrl);
router.post('/login', validateLogin, loginCtrl);

module.exports = router;
